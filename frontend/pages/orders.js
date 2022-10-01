import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import Head from "next/head";
import DisplayError from "../components/Error";
import formatMoney from "../lib/formatMoney";
import CartItem from "../components/CartItem";
import { useUser } from "../components/User";
import styled from "styled-components";
import Link from "next/link";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

function countItemsinOrder(order) {
  // console.log(order);
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

const OrdersPageStyles = styled.div`
  cursor: pointer;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }

  li {
    border: 1px solid var(--gray-200);
    box-shadow: var(--shadow-100);

    transition: box-shadow 0.25s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.01);
      box-shadow: var(--shadow-200);
    }

    .images {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
      justify-content: center;
      /* grid-gap: 24px; */
      img {
        height: 100px;
        object-fit: cover;
        margin: 0 auto;
      }
      padding: var(--spacing-400);
      padding-top: 0;
    }
  }

  .order__items {
    font-size: var(--fs-300);
    display: grid;
    grid-template-columns: repeat(3, 100px);
    justify-content: center;
    text-align: center;
    padding-bottom: 12px;
  }
`;

export default function OrdersPage() {
  const router = useRouter();
  const me = useUser();

  const { id } = router.query;
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { allOrders } = data;

  return (
    <OrdersPageStyles>
      <Head>
        <title>Your orders ({allOrders.length})</title>
      </Head>
      <p>You have {allOrders.length} orders!</p>
      <ul>
        {allOrders.map((order) => {
          return (
            <Link href={`/order/${order.id}`}>
              <li>
                <>
                  <div className="order__items">
                    <span>{countItemsinOrder(order)} Items</span>
                    <span>
                      {order.items.length} Product
                      {order.items.length === 1 ? "" : "s"}
                    </span>
                    <span>{formatMoney(order.total)}</span>
                  </div>
                  <div class="images">
                    {order.items.map((item) => (
                      <img
                        key={item.id}
                        src={item?.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </>
              </li>
            </Link>
          );
        })}
      </ul>
    </OrdersPageStyles>
  );
}
