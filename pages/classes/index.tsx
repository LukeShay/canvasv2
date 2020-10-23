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
}

function ClassCard({ userClass: { name, code, description } }: ClassCardProps) {
  return (
    <div className="flex justify-center">
      <div className="border border-gray-100 hover:border-gray-300 hover:bg-gray-100 rounded-md shadow-md p-6 m-4 w-3/4 text-center">
        <h2 className="text-lg">{name}</h2>
        <div className="text-indigo-500">{code}</div>
        <div className="text-gray-600">{description}</div>
        <div className="text-gray-600">(555) 765-4321</div>
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
