import React, { SyntheticEvent } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Paths } from '../lib/web/paths';
import Form from '../components/form/Form';
import Row from '../components/form/Row';
import Input from '../components/form/Input';
import Centered from '../components/Centered';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Select from '../components/form/Select';
import H2 from '../components/H2';
import { useViewer } from '../lib/web/hooks';
import { SignOutMutation } from '../lib/web/mutations';

function Profile() {
  const router = useRouter();
  const client = useApolloClient();

  const { viewer, data, loading, error } = useViewer();
  const [signOut] = useMutation(SignOutMutation);

  React.useEffect(() => {
    if ((!data || error) && !loading) {
      router.push(Paths.SIGN_IN);
    }
  }, [data, loading, error]);

  async function handleSignOutClick(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      await signOut();
      await client.resetStore();
      router.push(Paths.SIGN_IN);
    } catch (error) {
      // TODO: Handle errors
    }
  }

  if (error) {
    return <p>{error.message}</p>;
  }

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
              <Form className={!viewer ? 'animate-pulse' : undefined}>
                <Row>
                  <Input
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="Jane"
                    required
                    className="md:w-1/2"
                    autoComplete="given-name"
                    defaultValue={viewer?.firstName}
                    loading={!viewer}
                  />
                  <Input
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Doe"
                    required
                    className="md:w-1/2"
                    autoComplete="family-name"
                    defaultValue={viewer?.lastName}
                    loading={!viewer}
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
                    defaultValue={viewer?.email}
                    loading={!viewer}
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
                    loading={!viewer}
                  />
                </Row>
                <Row>
                  <Input
                    id="address1"
                    label="Address Line One"
                    type="text"
                    placeholder="1234 Wallaby Way"
                    autoComplete="address1"
                    defaultValue={viewer?.address1}
                    loading={!viewer}
                  />
                </Row>
                <Row>
                  <Input
                    id="address2"
                    label="Address Line Two"
                    type="text"
                    placeholder="P.O. 567"
                    autoComplete="address2"
                    defaultValue={viewer?.address2}
                    loading={!viewer}
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
                    defaultValue={viewer?.city}
                    loading={!viewer}
                  />
                  <Select id="state" label="state" required className="md:w-1/3" loading={!viewer}>
                    <option value="select">Select</option>
                  </Select>
                  <Input
                    id="zip"
                    label="Zip"
                    type="text"
                    placeholder="50000"
                    required
                    className="md:w-1/3"
                    minLength={5}
                    maxLength={5}
                    pattern="\d{5}"
                    defaultValue={viewer?.zip}
                    loading={!viewer}
                  />
                </Row>
                <Row>
                  <div className="w-full md:w-1/2 px-4 mb-2 md:mb-0">
                    <PrimaryButton type="submit" className="w-full" loading={!viewer}>
                      Save
                    </PrimaryButton>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <PrimaryButton
                      type="button"
                      className="w-full"
                      filled={false}
                      onClick={handleSignOutClick}
                      loading={!viewer}
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
