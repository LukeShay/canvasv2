const { v4 } = require('uuid');
const { Constants } = require('../utils');

exports.seed = function (knex) {
  const states = [
    {
      abbreviation: 'Ala.',
      code: 'AL',
      name: 'Alabama',
    },
    {
      abbreviation: 'Alaska',
      code: 'AK',
      name: 'Alaska',
    },
    {
      abbreviation: 'Ariz.',
      code: 'AZ',
      name: 'Arizona',
    },
    {
      abbreviation: 'Ark.',
      code: 'AR',
      name: 'Arkansas',
    },
    {
      abbreviation: 'Calif.',
      code: 'CA',
      name: 'California',
    },
    {
      abbreviation: 'Colo.',
      code: 'CO',
      name: 'Colorado',
    },
    {
      abbreviation: 'Conn.',
      code: 'CT',
      name: 'Connecticut',
    },
    {
      abbreviation: 'Del.',
      code: 'DE',
      name: 'Delaware',
    },
    {
      abbreviation: 'D.C.',
      code: 'DC',
      name: 'District of Columbia',
    },
    {
      abbreviation: 'Fla.',
      code: 'FL',
      name: 'Florida',
    },
    {
      abbreviation: 'Ga.',
      code: 'GA',
      name: 'Georgia',
    },
    {
      abbreviation: 'Hawaii',
      code: 'HI',
      name: 'Hawaii',
    },
    {
      abbreviation: 'Idaho',
      code: 'ID',
      name: 'Idaho',
    },
    {
      abbreviation: 'Ill.',
      code: 'IL',
      name: 'Illinois',
    },
    {
      abbreviation: 'Ind.',
      code: 'IN',
      name: 'Indiana',
    },
    {
      abbreviation: 'Iowa',
      code: 'IA',
      name: 'Iowa',
    },
    {
      abbreviation: 'Kans.',
      code: 'KS',
      name: 'Kansas',
    },
    {
      abbreviation: 'Ky.',
      code: 'KY',
      name: 'Kentucky',
    },
    {
      abbreviation: 'La.',
      code: 'LA',
      name: 'Louisiana',
    },
    {
      abbreviation: 'Maine',
      code: 'ME',
      name: 'Maine',
    },
    {
      abbreviation: 'Md.',
      code: 'MD',
      name: 'Maryland',
    },
    {
      abbreviation: 'Mass.',
      code: 'MA',
      name: 'Massachusetts',
    },
    {
      abbreviation: 'Mich.',
      code: 'MI',
      name: 'Michigan',
    },
    {
      abbreviation: 'Minn.',
      code: 'MN',
      name: 'Minnesota',
    },
    {
      abbreviation: 'Miss.',
      code: 'MS',
      name: 'Mississippi',
    },
    {
      abbreviation: 'Mo.',
      code: 'MO',
      name: 'Missouri',
    },
    {
      abbreviation: 'Mont.',
      code: 'MT',
      name: 'Montana',
    },
    {
      abbreviation: 'Nebr.',
      code: 'NE',
      name: 'Nebraska',
    },
    {
      abbreviation: 'Nev.',
      code: 'NV',
      name: 'Nevada',
    },
    {
      abbreviation: 'N.H.',
      code: 'NH',
      name: 'New Hampshire',
    },
    {
      abbreviation: 'N.J.',
      code: 'NJ',
      name: 'New Jersey',
    },
    {
      abbreviation: 'N.M.',
      code: 'NM',
      name: 'New Mexico',
    },
    {
      abbreviation: 'N.Y.',
      code: 'NY',
      name: 'New York',
    },
    {
      abbreviation: 'N.C.',
      code: 'NC',
      name: 'North Carolina',
    },
    {
      abbreviation: 'N.D.',
      code: 'ND',
      name: 'North Dakota',
    },
    {
      abbreviation: 'Ohio',
      code: 'OH',
      name: 'Ohio',
    },
    {
      abbreviation: 'Okla.',
      code: 'OK',
      name: 'Oklahoma',
    },
    {
      abbreviation: 'Ore.',
      code: 'OR',
      name: 'Oregon',
    },
    {
      abbreviation: 'Pa.',
      code: 'PA',
      name: 'Pennsylvania',
    },
    {
      abbreviation: 'R.I.',
      code: 'RI',
      name: 'Rhode Island',
    },
    {
      abbreviation: 'S.C.',
      code: 'SC',
      name: 'South Carolina',
    },
    {
      abbreviation: 'S.D.',
      code: 'SD',
      name: 'South Dakota',
    },
    {
      abbreviation: 'Tenn.',
      code: 'TN',
      name: 'Tennessee',
    },
    {
      abbreviation: 'Tex.',
      code: 'TX',
      name: 'Texas',
    },
    {
      abbreviation: 'Utah',
      code: 'UT',
      name: 'Utah',
    },
    {
      abbreviation: 'Vt.',
      code: 'VT',
      name: 'Vermont',
    },
    {
      abbreviation: 'Va.',
      code: 'VA',
      name: 'Virginia',
    },
    {
      abbreviation: 'Wash.',
      code: 'WA',
      name: 'Washington',
    },
    {
      abbreviation: 'W.Va.',
      code: 'WV',
      name: 'West Virginia',
    },
    {
      abbreviation: 'Wis.',
      code: 'WI',
      name: 'Wisconsin',
    },
    {
      abbreviation: 'Wyo.',
      code: 'WY',
      name: 'Wyoming',
    },
  ];
  return knex(Constants.STATES_TABLE)
    .del()
    .then(() =>
      knex(Constants.STATES_TABLE).insert(states.map((value) => ({ ...value, id: v4() }))),
    );
};
