import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/node';
import Link from 'next/link';
import React from 'react';
import { SignUpMutation, StatesQuery, Paths } from '../lib/client';
import Centered from '../components/Centered';
import CenterForm from '../components/form/CenterForm';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Logo from '../components/logos/Logo';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Row from '../components/form/Row';
import Select from '../components/form/Select';
import Page from '../components/Page';

export interface ValuesState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  state: string;
  zip: string;
}

function SignUp() {
  const router = useRouter();
  const [signUp] = useMutation(SignUpMutation);
  const { data: states } = useQuery(StatesQuery);
  const [values, setValues] = React.useState<ValuesState>({
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    state: 'select',
    zip: '',
  });

  function handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await signUp({ variables: values });
      router.push(Paths.SIGN_IN);
    } catch (error) {
      Sentry.captureException(error);
      toast(
        'There was an error signing up. Please try again. If this issue persists, contact support.',
        { type: toast.TYPE.ERROR }
      );
    }
  }

  return (
    <Page>
      <CenterForm>
        <div className="py-5">
          <Centered>
            <Logo size={60} />
          </Centered>
          <h2 className="mt-6 text-center">Sign up for an account</h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or
            <Link href={Paths.SIGN_IN}>
              <a className="ml-1 font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                sign into your account
              </a>
            </Link>
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Input
              id="firstName"
              label="First Name"
              type="text"
              placeholder="Jane"
              required
              className="md:w-1/2"
              autoComplete="given-name"
              value={values.firstName}
              onChange={handleChange}
            />
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              required
              className="md:w-1/2"
              autoComplete="family-name"
              value={values.lastName}
              onChange={handleChange}
            />
          </Row>
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
          <Row className="mb-3">
            <Input
              id="city"
              label="city"
              type="text"
              placeholder="Austin"
              required
              className="md:w-1/3"
              value={values.city}
              onChange={handleChange}
            />
            <Select
              id="state"
              label="state"
              required
              className="md:w-1/3"
              value={values.state}
              onChange={handleChange}
            >
              <option value="select">Select</option>
              {states?.states &&
                states.states.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
            </Select>
            <Input
              id="zip"
              label="Zip"
              type="text"
              placeholder="50000"
              required
              className="md:w-1/3"
              onChange={handleChange}
              minLength={5}
              maxLength={5}
              pattern="\d{5}"
            />
          </Row>
          <Centered>
            <PrimaryButton
              type="submit"
              className="w-full sm:w-full md:w-40 lg:w-40 xl:w-40"
              filled={false}
            >
              Sign up
            </PrimaryButton>
          </Centered>
        </Form>
      </CenterForm>
    </Page>
  );
}

export default SignUp;
