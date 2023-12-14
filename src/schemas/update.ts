export default {
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'datePosted',
      title: 'Date Posted',
      type: 'datetime',
    },
  ],
};
