import * as Sentry from '@sentry/node';
import { toast } from 'react-toastify';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import React, { SyntheticEvent } from 'react';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { IUser, UserRole } from '../lib/types';
import { StatesQuery, Paths } from '../lib/client';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Page from '../components/Page';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Row from '../components/form/Row';
import Select from '../components/form/Select';
import { getServerSideRedirect } from '../lib/client/redirect';

const UpdateUserMutation = gql`
  mutation UpdateUserMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String
    $address1: String
    $address2: String
    $city: String
    $stateId: String
    $zip: String
  ) {
    updateUser(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        address1: $address1
        address2: $address2
        city: $city
        stateId: $stateId
        zip: $zip
      }
    ) {
      user {
        id
        email
        firstName
        lastName
        city
        zip
        role
        stateId
        address1
        address2
        state {
          id
          code
          abbreviation
          name
        }
      }
    }
  }
`;

export const getServerSideProps = (context: NextPageContext) =>
  getServerSideRedirect(context, Paths.SIGN_IN, UserRole.BASIC);

function Profile({ viewer }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const client = useApolloClient();

  const { data: statesData } = useQuery(StatesQuery);

  const [updateUser] = useMutation(UpdateUserMutation);

  const [values, setValues] = React.useState<IUser>({
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    password: '',
    role: UserRole.BASIC,
  });

  React.useEffect(() => {
    if (viewer) {
      setValues(viewer);
    }
  }, [viewer]);

  async function handleSignOutClick(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      await signOut();
      await client.resetStore();
      router.push(Paths.SIGN_IN);
    } catch (error) {
      Sentry.captureException(error);
      toast(
        'There was an error signing out. Please try again. If this issue persists, contact support.',
        { type: toast.TYPE.ERROR }
      );
    }
  }

  function handleChange(event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;

    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await updateUser({ variables: values });
      toast('Your account was successfully updated.', { type: toast.TYPE.SUCCESS });
    } catch (error) {
      Sentry.captureException(error);
      toast(
        'There was an error updating your profile. Please try again. If this issue persists, contact support.',
        { type: toast.TYPE.ERROR }
      );
    }
  }

  return (
    <Page>
      <h2 className="mt-6 text-center">Your Profile</h2>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full md:flex p-10">
          <div className="w-full md:w-1/3">
            <div className="flex justify-center">
              <img src="/person.svg" width={200} height={200} className="mt-4" alt="person" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex justify-center text-left">
              <Form
                className={!viewer || !statesData ? 'animate-pulse' : undefined}
                onSubmit={handleSubmit}
              >
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
                    loading={!viewer || !statesData}
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
                    loading={!viewer || !statesData}
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
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                </Row>
                <Row>
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="******************"
                    autoComplete="password"
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                </Row>
                <Row>
                  <Input
                    id="address1"
                    label="Address Line One"
                    type="text"
                    placeholder="1234 Wallaby Way"
                    autoComplete="address1"
                    value={values.address1 || ''}
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                </Row>
                <Row>
                  <Input
                    id="address2"
                    label="Address Line Two"
                    type="text"
                    placeholder="P.O. 567"
                    autoComplete="address2"
                    value={values.address2 || ''}
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                </Row>
                <Row className="mb-3">
                  <Input
                    id="city"
                    label="city"
                    type="text"
                    placeholder="Austin"
                    className="md:w-1/3"
                    value={values.city || ''}
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                  <Select
                    id="stateId"
                    label="state"
                    className="md:w-1/3"
                    loading={!viewer || !statesData}
                    value={values.state?.abbreviation}
                    onChange={handleChange}
                  >
                    <option value="select">Select</option>
                    {statesData !== undefined &&
                      statesData.states.map(({ id, name }) => (
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
                    className="md:w-1/3"
                    minLength={5}
                    maxLength={5}
                    pattern="\d{5}"
                    value={values.zip || ''}
                    loading={!viewer || !statesData}
                    onChange={handleChange}
                  />
                </Row>
                <Row>
                  <div className="w-full md:w-1/2 px-4 mb-2 md:mb-0">
                    <PrimaryButton
                      type="submit"
                      className="w-full"
                      loading={!viewer || !statesData}
                    >
                      Save
                    </PrimaryButton>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <PrimaryButton
                      type="button"
                      className="w-full"
                      filled={false}
                      onClick={handleSignOutClick}
                      loading={!viewer || !statesData}
                    >
                      Sign out
                    </PrimaryButton>
                  </div>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
