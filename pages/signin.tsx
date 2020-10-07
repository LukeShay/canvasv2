import Link from 'next/link';
import React from 'react';
import Centered from '../components/Centered';
import CenterForm from '../components/Form/CenterForm';
import Form from '../components/Form/Form';
import Input from '../components/Form/Input';
import Row from '../components/Form/Row';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import { Paths } from '../lib/web/paths';

export interface ValuesState {
  email: string;
  password: string;
}

function SignIn() {
  const [values, setValues] = React.useState<ValuesState>({ email: '', password: '' });

  function handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.id]: target.value });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <CenterForm>
      <div className="py-5">
        <Centered>
          <Logo size={60} />
        </Centered>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign into your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600">
          Or
          <Link href={Paths.SIGN_UP}>
            <a className="ml-1 font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              sign up for an account
            </a>
          </Link>
        </p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Input
            id="email"
            label="Email"
            type="text"
            placeholder="jane.doe@email.com"
            required
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******************"
            required
            autoComplete="password"
            value={values.password}
            onChange={handleChange}
          />
        </Row>
        <Centered>
          <PrimaryButton className="w-full sm:w-full md:w-40 lg:w-40 xl:w-40">
            Sign in
          </PrimaryButton>
        </Centered>
      </Form>
    </CenterForm>
  );
}

export default SignIn;
