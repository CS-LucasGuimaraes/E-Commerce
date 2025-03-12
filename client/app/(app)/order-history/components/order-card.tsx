"use client";
import { axiosApi } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Order {
  order_id: number;
  order_data: string;
  destination: string;
  status: string;
  total_value: number | string;
}

interface OrderItem {
  id: string;
  product_id: string;
  price_paid: string;
  amount: number;
  product_name: string;
  image_url: string;
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([]);
  const defaultImage =
    "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";

  useEffect(() => {
    const loadOrderItems = async () => {
      try {
        // Busca direta dos itens do pedido
        // const orderResponse = await axiosApi.get(
        //         `/product-order-history?order_id=${order.order_id}`
        //       );
        const orderResponse = await axiosApi.get(
          `https://e-commerce-api-fnhq.onrender.com/product-order-history?order_id=${order.order_id}`
        );
        //console.log(orderResponse);
        // const orderResponse = await axiosApi.get(
        //   `http://localhost:3000/product-order-history?order_id=${order.order_id}`
        // );

        const orderItems = orderResponse.data;

        if (!Array.isArray(orderItems)) return;

        // Busca das informações dos produtos
        const productRequests = orderItems.map(async (item) => {
          try {
            // const productResponse = await axiosApi.get(
            //               '/products/${item.product_id}'
            //             );
            const productResponse = await axiosApi.get(
              `https://e-commerce-api-fnhq.onrender.com/products/${item.product_id}`
            );
            // const productResponse = await axiosApi.get(
            //   `http://localhost:3000/products/${item.product_id}`
            // );
            //console.log(productResponse);

            return {
              ...item,
              product_name: productResponse.data.name,
              image_url: productResponse.data.image_url,
            };
          } catch (error) {
            return {
              ...item,
              product_name: "Produto não disponível",
              image_url: defaultImage,
            };
          }
        });

        const completeItems = await Promise.all(productRequests);
        setItems(completeItems.slice(0, 4));
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
      }
    };

    loadOrderItems();
  }, [order.order_id]);

  const navigateToOrderDetails = () => {
    router.push(`/product-order-history/${order.order_id}`);
  };

  return (
    <div className="bg-white border border-gray-300 p-4 m-2 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out cursor-pointer">
      <div className="flex justify-between">
        {/* Order details */}
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-800">
            Order #{order.order_id}
          </h3>
          <div className="flex items-center mb-1 text-sm text-gray-600">
            <p className="mr-2">Order placed: {order.order_data}</p>
            <p>Destination: {order.destination}</p>
          </div>
          <p className="mb-2 text-sm text-gray-600">
            Status:{" "}
            <strong
              className={`font-bold ${
                order.status === "delivered" ? "text-green-600" : "text-red-600"
              }`}
            >
              {order.status}
            </strong>
          </p>
          <p className="mb-2 text-base font-bold text-black">
            Total Value: $ {parseFloat(order.total_value.toString()).toFixed(2)}
          </p>
          <button
            className="mt-1 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={navigateToOrderDetails}
          >
            See details
          </button>
        </div>

        {/* Product images */}
        <div className="flex gap-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ))
          ) : (
            <img
              src="https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
              alt="Default image"
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
