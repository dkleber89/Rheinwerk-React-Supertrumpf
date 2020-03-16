export default {
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
  },

  td: {
    padding: '5px 0',
  },

  tr: {
    ':hover': {
      backgroundColor: 'lightblue',
    },
  },

  light: {
    tr: {
      backgroundColor: '#ddd',
    },
  },

  dark: {
    tr: { backgroundColor: '#666' },
  },

  activeRow: {
    backgroundColor: 'yellow',
  },
};
