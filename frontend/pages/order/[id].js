import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import Head from "next/head";
import DisplayError from "../../components/Error";
import formatMoney from "../../lib/formatMoney";
import CartItem from "../../components/CartItem";
import { useUser } from "../../components/User";
import styled from "styled-components";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      date
      user {
        id
        name
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

const SinglePageOrderStyles = styled.div`
  /* border: 1px solid black; */
  border-radius: 25px;
  padding: 0 var(--spacing-600);

  h3 {
    border-bottom: 2px solid black;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    margin: 0;
    line-height: var(--lh-2);
    font-size: var(--fs-300);
  }

  .order__details {
    border-top: 4px solid black;
    border-bottom: 2px solid black;
    margin-top: var(--spacing-600);
    padding: var(--spacing-400) 0;
    justify-content: space-evenly;
    display: flex;
    gap: var(--spacing-900);
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .order__item {
    display: grid;
    gap: 16px;
    grid-template-columns: 200px 1fr;
    margin-bottom: 24px;
    padding-bottom: 24px;
    justify-content: center;
    border-bottom: 1px solid var(--gray-200);
    overflow: hidden;

    img {
      object-fit: contain;
      overflow: hidden;
      justify-self: center;
      max-width: 200px;
    }
  }

  .item__name {
    margin: 0;
  }

  .thanks {
    margin-top: var(--spacing-400);
    font-weight: bold;
  }
`;

export default function SinglePageOrder() {
  const router = useRouter();
  const me = useUser();

  const { id } = router.query;
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { order } = data;

  return (
    <SinglePageOrderStyles>
      <Head>
        <title>Lincoln doodle - {order.id}</title>
      </Head>
      <h2>Your order is confirmed!</h2>
      <p>Hi, {order.user.name}!</p>
      <p>Your order has been confirmed and will be shipping soon.</p>

      <div className="order__details">
        <p>
          <span>Order#: </span>
          <span style={{ fontWeight: "bold" }}>{order.id}</span>
        </p>
        <p>
          <span>Date: </span>
          <span style={{ fontWeight: "bold" }}>{order.date}</span>
        </p>

        <p>
          <span>Items: </span>
          <span style={{ fontWeight: "bold" }}>{order.items.length}</span>
        </p>
      </div>
      <ul>
        {order.items.map((item) => {
          console.log(item);
          return (
            <li key={item.id} className="order__item">
              <img
                style={{ height: "125px" }}
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
              />
              <div>
                <h4 className="item__name">
                  {item.name} - {formatMoney(item.price)}
                </h4>
                <p>
                  Qty:{" "}
                  <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                </p>
                <p>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <h3>Total: {formatMoney(order.total)}</h3>
      <p>
        We'll send you shipping confirmation when you item(s) are on the way! We
        appreciate your business, and hope you enjoy your purchase.
      </p>
      <p className="thanks">Thank you!</p>
      <p>Lincoln doodles</p>
    </SinglePageOrderStyles>
  );
}
