import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/node';
import Link from 'next/link';
import React from 'react';
import { Paths, useViewer, SignInMutation } from '../lib/client';
import Centered from '../components/Centered';
import CenterForm from '../components/form/CenterForm';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Logo from '../components/logos/Logo';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Row from '../components/form/Row';

export interface ValuesState {
  email: string;
  password: string;
}

function SignIn() {
  const router = useRouter();
  const [signIn] = useMutation(SignInMutation);
  const { viewer } = useViewer();
  const [values, setValues] = React.useState<ValuesState>({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if (viewer) {
      router.push(Paths.PROFILE);
    }
  }, [viewer]);

  function handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await signIn({ variables: values });
      router.push(Paths.PROFILE);
    } catch (error) {
      Sentry.captureException(error);
      // TODO: Handle failure
    }
  }

  return (
    <CenterForm>
      <div className="py-5">
        <Centered>
          <Logo size={60} />
        </Centered>
        <h2 className="mt-6 text-center">Sign into your account</h2>
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
          <PrimaryButton
            type="submit"
            className="w-full sm:w-full md:w-40 lg:w-40 xl:w-40"
            filled={false}
          >
            Sign in
          </PrimaryButton>
        </Centered>
      </Form>
    </CenterForm>
  );
}

export default SignIn;
