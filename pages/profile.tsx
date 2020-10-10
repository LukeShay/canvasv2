import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { Paths } from '../lib/web/paths';
import Form from '../components/form/Form';
import Row from '../components/form/Row';
import Input from '../components/form/Input';
import Centered from '../components/Centered';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Select from '../components/form/Select';
import Logo from '../components/logos/Logo';
import H2 from '../components/H2';
import { useViewer } from '../lib/web/hooks';

function Profile() {
  const router = useRouter();

  const { viewer, data, loading, error } = useViewer();

  React.useEffect(() => {
    if ((!data || error) && !loading) {
      router.push(Paths.SIGN_IN);
    }
  }, [data, loading, error]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (viewer) {
    return (
      <>
        <H2 className="mt-6 text-center">Your Profile</H2>
        <Centered>
          <div className="max-w-4xl w-full md:flex p-10">
            <div className="w-full md:w-1/3">
              <Centered>
                <Logo size={200} className="mt-4" />
              </Centered>
            </div>
            <div className="w-full md:w-2/3">
              <Centered className="text-left">
                <Form>
                  <Row>
                    <Input
                      id="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Jane"
                      required
                      className="md:w-1/2"
                      autoComplete="given-name"
                      defaultValue={viewer.firstName}
                    />
                    <Input
                      id="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Doe"
                      required
                      className="md:w-1/2"
                      autoComplete="family-name"
                      defaultValue={viewer.lastName}
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
                      defaultValue={viewer.email}
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
                    />
                  </Row>
                  <Row>
                    <Input
                      id="address1"
                      label="Address Line One"
                      type="text"
                      placeholder="1234 Wallaby Way"
                      autoComplete="address1"
                      defaultValue={viewer.address1}
                    />
                  </Row>
                  <Row>
                    <Input
                      id="address2"
                      label="Address Line Two"
                      type="text"
                      placeholder="P.O. 567"
                      autoComplete="address2"
                      defaultValue={viewer.address2}
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
                      defaultValue={viewer.city}
                    />
                    <Select id="state" label="state" required className="md:w-1/3">
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
                      defaultValue={viewer.zip}
                    />
                  </Row>
                  <Centered>
                    <PrimaryButton
                      type="submit"
                      className="w-full sm:w-full md:w-40 lg:w-40 xl:w-40"
                      filled={false}
                    >
                      Save
                    </PrimaryButton>
                  </Centered>
                </Form>
              </Centered>
            </div>
          </div>
        </Centered>
      </>
    );
  }

  return <p>Loading...</p>;
}

export default Profile;
