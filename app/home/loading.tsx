import Spinner from "../_components/common/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading data...</p>
    </div>
  );
}
