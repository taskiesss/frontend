import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface NotificationSocketResponse {
  notificationId: string;
  content: string;
  isRead: boolean;
  type:
    | 'PROPOSAL'
    | 'CONTRACT'
    | 'COMMUNITY_PROFILE'
    | 'COMMUNITY_JOBS_AND_TALENTS'
    | 'COMMUNITY_POSTS'
    | 'COMMUNITY_SETTINGS'
    | '';
  routeId: string;
  newNotificationsCount: number;
}

const useWebSocket = (userId: string, token?: string) => {
  const [messages, setMessages] = useState<NotificationSocketResponse[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId) {
      console.warn('No userId provided, skipping WebSocket connection');
      return;
    }

    // Initialize STOMP client over SockJS
    const client = new Client({
      webSocketFactory: () => {
        const socket = new SockJS(`${BASE_URL}/ws-notifications`);
        console.log('SockJS initialized:', socket);
        return socket;
      },

      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},

      reconnectDelay: 5000, // Auto-reconnect after 5 seconds

      onConnect: () => {
        console.log('Connected to WebSocket');

        // Subscribe to user-specific destination
        client.subscribe(`/notifications/${userId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
      },
    });

    clientRef.current = client;

    // Activate the client

    client.activate();

    // Cleanup on unmount
    return () => {
      client.deactivate();
      console.log('Disconnected from WebSocket');
    };
  }, [userId, token]); // Re-run effect if userId changes

  return { messages };
};

export default useWebSocket;
