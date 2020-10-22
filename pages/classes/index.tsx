import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Page from '../../components/Page';
import { IClass } from '../../lib/types';

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
  memberType: 'ADMIN' | 'ASSISTANT' | 'STUDENT';
}

function ClassCard({ userClass: { coverPhoto, name, code, description } }: ClassCardProps) {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4">
      <div className="md:flex bg-white rounded-lg p-6 border border-gray-100 m-2">
        <img
          className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
          src={coverPhoto}
          alt="cover"
        />
        <div className="text-center md:text-left">
          <h2 className="text-lg">{name}</h2>
          <div className="text-indigo-500">{code}</div>
          <div className="text-gray-600">{description}</div>
          <div className="text-gray-600">(555) 765-4321</div>
        </div>
      </div>
    </div>
  );
}

function Classes() {
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
      <div className="flex justify-center">
        {classes.adminClasses.map((adminClass) => (
          <ClassCard key={adminClass.id} userClass={adminClass} memberType="ADMIN" />
        ))}
        {classes.assistantClasses.map((assistantClass) => (
          <ClassCard key={assistantClass.id} userClass={assistantClass} memberType="ASSISTANT" />
        ))}
        {classes.studentClasses.map((studentClass) => (
          <ClassCard key={studentClass.id} userClass={studentClass} memberType="STUDENT" />
        ))}
      </div>
    </Page>
  );
}

export default Classes;
