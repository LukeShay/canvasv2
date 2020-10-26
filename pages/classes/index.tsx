import { gql, useQuery } from '@apollo/client';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Page from '../../components/Page';
import Plus from '../../components/Plus';
import { Paths } from '../../lib/client';
import { atLeastPowerUser } from '../../lib/client/authenticator';
import { getServerSideRedirect } from '../../lib/client/redirect';
import { IClass, UserRole } from '../../lib/types';

const ClassesQuery = gql`
  query ClassesQuery {
    classes {
      adminClasses {
        id
        code
        name
        building
        description
        room
        adminId
      }
      assistantClasses {
        id
        code
        name
        building
        description
        room
        adminId
      }
      studentClasses {
        id
        code
        name
        building
        description
        room
        adminId
      }
    }
  }
`;

interface ClassesState {
  adminClasses: IClass[];
  assistantClasses: IClass[];
  studentClasses: IClass[];
}

interface ClassCardProps {
  userClass: IClass;
}

function ClassCard({ userClass: { name, code, description, id } }: ClassCardProps) {
  return (
    <div className="flex justify-center">
      <Link href={`${Paths.CLASS}/${id}`}>
        <div className="border border-gray-100 hover:border-gray-300 hover:bg-gray-100 rounded-md shadow-md p-6 m-4 w-3/4 text-center cursor-pointer">
          <h2 className="text-lg">{name}</h2>
          <div className="text-indigo-500">{code}</div>
          <div className="text-gray-600">{description}</div>
          <div className="text-gray-600">(555) 765-4321</div>
        </div>
      </Link>
    </div>
  );
}

function ClassCardSkeleton() {
  return (
    <div className="flex justify-center cursor-pointer animate-pulse">
      <div className="border border-gray-100 hover:border-gray-300 hover:bg-gray-100 rounded-md shadow-md p-6 m-4 w-3/4 text-center">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="text-lg text-gray-400 bg-gray-400 border border-white rounded">a</h2>
        <div className="text-gray-400 bg-gray-400 border border-white rounded">a</div>
        <div className="text-gray-400 bg-gray-400 border border-white rounded">a</div>
        <div className="text-gray-400 bg-gray-400 border border-white rounded">a</div>
      </div>
    </div>
  );
}

function AdminToolbar() {
  return (
    <div className="w-full border border-gray-200 rounded shadow">
      <PrimaryButton>New Class</PrimaryButton>
    </div>
  );
}

export const getServerSideProps = (context: NextPageContext) =>
  getServerSideRedirect(context, Paths.SIGN_IN, UserRole.BASIC);

function Classes({ viewer }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, loading } = useQuery(ClassesQuery);
  const [classes, setClasses] = React.useState<ClassesState>({
    adminClasses: [],
    assistantClasses: [],
    studentClasses: [],
  });

  React.useEffect(() => {
    if (!loading && data) {
      setClasses(data.classes as ClassesState);
    }
  });

  return (
    <Page title="Classes">
      {loading && (
        <>
          <h1 className="w-full text-center border-b border-gray-300 p-2 m-2">Classes</h1>
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
          <ClassCardSkeleton />
        </>
      )}
      {atLeastPowerUser(viewer) && <AdminToolbar />}
      {classes.adminClasses.length > 0 && (
        <h1 className="w-full text-center border-b border-gray-300 p-2 m-2">
          Classes you administer
        </h1>
      )}
      {classes.adminClasses.map((adminClass) => (
        <ClassCard key={adminClass.id} userClass={adminClass} />
      ))}
      {classes.assistantClasses.length > 0 && (
        <h1 className="w-full text-center border-b border-gray-300 p-2 m-2">Classes you assist</h1>
      )}
      {classes.assistantClasses.map((assistantClass) => (
        <ClassCard key={assistantClass.id} userClass={assistantClass} />
      ))}
      {classes.studentClasses.length > 0 && (
        <h1 className="w-full text-center border-b border-gray-300 p-2 m-2">
          Classes you a student in
        </h1>
      )}
      {classes.studentClasses.map((studentClass) => (
        <ClassCard key={studentClass.id} userClass={studentClass} />
      ))}
    </Page>
  );
}

export default Classes;
