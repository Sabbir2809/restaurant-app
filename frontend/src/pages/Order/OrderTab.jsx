import Card from "../../components/Card";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-10 justify-center">
      {items.map((items) => (
        <Card key={items._id} items={items} />
      ))}
    </div>
  );
};

export default OrderTab;
