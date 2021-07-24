import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import avatarImg from '../../public/images/avatar.svg';

import { SubscribeButton } from '../components/SubscribeButton';

import { stripe } from '../services/stripe';

import styles from '../styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={avatarImg} alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stripeProduct = await stripe.prices.retrieve(
    'price_1JGtryBnlASF3ytPueiryLnx'
  );

  const product = {
    priceId: stripeProduct.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(stripeProduct.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
