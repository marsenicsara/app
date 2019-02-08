import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fm = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'UNION',
          name: 'Message union',
          possibleTypes: [
            { name: 'MessageBody' },
            { name: 'MessageBodyChoices' },
          ],
        },
        {
          kind: 'INTERFACE',
          name: 'Message interface',
          possibleTypes: [{ name: 'MessageBodyCore' }],
        },
      ],
    },
  },
});

export default fm;
