import React, { SyntheticEvent } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/node';
import { Paths } from '~/lib/web/paths';
import Form from '~/components/form/Form';
import Row from '~/components/form/Row';
import Input from '~/components/form/Input';
import Centered from '~/components/Centered';
import PrimaryButton from '~/components/buttons/PrimaryButton';
import Select from '~/components/form/Select';
import H2 from '~/components/H2';
import { useViewer } from '~/lib/web/hooks';
import { SignOutMutation, UpdateUserMutation } from '~/lib/web/server/mutations';
import { IUser, UserRole } from '~/lib/types';
import { StatesQuery } from '~/lib/web/server/queries';

function Profile() {
  const router = useRouter();
  const client = useApolloClient();

  const { viewer, data, loading, error } = useViewer();
  const { data: statesData } = useQuery(StatesQuery);

  const [signOut] = useMutation(SignOutMutation);
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
    if ((!data || error) && !loading) {
      router.push(Paths.SIGN_IN);
    }
  }, [data, loading, error]);

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
      // TODO: Handle errors
    }
  }

  function handleChange(event: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;

    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const {
        data: { updateUser: user },
      } = await updateUser({ variables: values });
      setValues(user);
    } catch (error) {
      Sentry.captureException(error);
      // TODO: Handle errors
    }
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  // if (!viewer || !states) {
  //   return <div>Loading</div>;
  // }

  return (
    <>
      <H2 className="mt-6 text-center">Your Profile</H2>
      <Centered>
        <div className="max-w-4xl w-full md:flex p-10">
          <div className="w-full md:w-1/3">
            <Centered>
              <img src="/person.svg" width={200} height={200} className="mt-4" alt="person" />
            </Centered>
          </div>
          <div className="w-full md:w-2/3">
            <Centered className="text-left">
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
            </Centered>
          </div>
        </div>
      </Centered>
    </>
  );
}

export default Profile;
