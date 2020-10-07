import { useMutation } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import Centered from '../components/Centered';
import CenterForm from '../components/Form/CenterForm';
import Form from '../components/Form/Form';
import Input from '../components/Form/Input';
import Row from '../components/Form/Row';
import Select from '../components/Form/Select';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import { SignUpMutation } from '../lib/web/mutations';
import { Paths } from '../lib/web/paths';

const states = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
];

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
  const [values, setValues] = React.useState<ValuesState>({
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    state: 'select',
    zip: '',
  });

  const [signUp] = useMutation(SignUpMutation);

  function handleChange(event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.id]: target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      const result = await signUp({ variables: values });
      console.log(result);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  }

  return (
    <CenterForm>
      <div className="py-5">
        <Centered>
          <Logo size={60} />
        </Centered>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign up for an account
        </h2>
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
            autoFocus
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
            {states.map(({ abbreviation, name }) => (
              <option value={abbreviation} key={abbreviation}>
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
          <PrimaryButton className="w-full sm:w-full md:w-40 lg:w-40 xl:w-40">
            Sign up
          </PrimaryButton>
        </Centered>
      </Form>
    </CenterForm>
  );
}

export default SignUp;
