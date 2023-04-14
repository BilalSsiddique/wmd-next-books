
import SingleOrder from "../../../component/SingleOrder";

export default function Order({ params }: { params: { orderid: string } }) {
  console.log('orderId',params)
  return (
    <div className="flex flex-col pb-5">
      {/* Page title */}
      <h1 className="text-center font-bold text-4xl pb-12 text-white">Order Details</h1>
      <div className="flex justify-center">
        <SingleOrder orderId={params.orderid} />
      </div>
    </div>
  );
}
