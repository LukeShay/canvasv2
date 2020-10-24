import { gql, useMutation } from '@apollo/client';
import { NextPageContext } from 'next';
import { toast } from 'react-toastify';
import React from 'react';
import { getServerSideRedirect } from '../../lib/client/redirect';
import { Paths } from '../../lib/client';
import { UserRole } from '../../lib/types';
import CenterForm from '../../components/form/CenterForm';
import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import Page from '../../components/Page';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const CreateClassMutation = gql`
  mutation CreateClassMutation(
    $adminId: String!
    $building: String
    $code: String!
    $description: String
    $name: String!
    $room: String
  ) {
    createClass(
      input: {
        adminId: $adminId
        building: $building
        code: $code
        description: $description
        name: $name
        room: $room
      }
    ) {
      class {
        id
      }
    }
  }
`;

export const getServerSideProps = (context: NextPageContext) =>
  getServerSideRedirect(context, Paths.CLASSES, UserRole.POWER_USER);

function Create() {
  const [createClass] = useMutation(CreateClassMutation);

  const [values, setValues] = React.useState({});

  function handleChange(event: React.SyntheticEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data } = await createClass({ variables: values });

      if (data?.createClass?.class?.id) {
        toast(`Class created with id ${data.createClass.class.id}.`, { type: toast.TYPE.SUCCESS });
      } else {
        toast('There was an error creating the class.', { type: toast.TYPE.ERROR });
      }
    } catch (error) {
      toast(error.message, { type: toast.TYPE.ERROR });
    }
  }

  return (
    <Page title="Classes">
      <h2>Classes Page</h2>
      <CenterForm>
        <Form onSubmit={handleSubmit}>
          <Input id="building" onChange={handleChange} label="Building" required />
          <Input id="code" onChange={handleChange} label="Code" required />
          <Input id="description" onChange={handleChange} label="Description" required />
          <Input id="name" onChange={handleChange} label="Name" required />
          <Input id="room" onChange={handleChange} label="Room" required />
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Form>
      </CenterForm>
    </Page>
  );
}

export default Create;
