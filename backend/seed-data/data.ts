function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const products = [
  {
    name: 'Butterfly',
    description: 'Butterfly on white paper, blue crayon.',
    status: 'AVAILABLE',
    price: 200,
    photo: {
      id: 'v1651435866',
      filename: 'butterfly.jpg',
      originalFilename: 'butterfly.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'v1651435866/link-draws/butterfly',
        width: 750,
        height: 457,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        type: 'upload',
        placeholder: false,
        url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651435866/link-draws/butterfly.jpg',
        secure_url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651435866/link-draws/butterfly.jpg',
        original_filename: 'file',
      },
    },
    // createdBy: null,
    // updatedBy: null,
    // updatedAt_utc: '2020-12-19T21:35:35.739Z',
    // updatedAt_offset: '+00:00',
    // createdAt_utc: '2020-12-19T21:35:35.739Z',
    // createdAt_offset: '+00:00',
  },
  {
    name: 'Caterpillar',
    description: 'Caterpillar, white paper, blue crayon.',
    status: 'AVAILABLE',
    price: 200,
    photo: {
      id: 'v1651439026',
      filename: 'Caterpillar.jpg',
      originalFilename: 'Caterpillar.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'v1651439026/link-draws/Caterpillar',
        width: 960,
        height: 640,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        type: 'upload',
        placeholder: false,
        url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651439026/link-draws/Caterpillar.jpg',
        secure_url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651439026/link-draws/Caterpillar.jpg',
        original_filename: 'file',
      },
    },
    // createdBy: '5de9a29642ca551f24c596ba',
    // updatedBy: '5de9a29642ca551f24c596ba',
    // updatedAt_utc: '2020-01-23T21:45:20.833Z',
    // updatedAt_offset: '+00:00',
    // createdAt_utc: '2020-01-23T21:45:20.833Z',
    // createdAt_offset: '+00:00',
  },
  {
    name: 'Ghost',
    description: 'Ghost, white paper, blue crayon.',
    status: 'AVAILABLE',
    price: 200,
    photo: {
      id: 'v1651436643',
      filename: 'Ghost.jpg',
      originalFilename: 'Ghost.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'v1651436643/link-draws/Ghost',
        width: 960,
        height: 640,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        type: 'upload',
        placeholder: false,
        url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651436643/link-draws/Ghost.jpg',
        secure_url:
          'https://res.cloudinary.com/mattthebunny/image/upload/v1651436643/link-draws/Ghost.jpg',
        original_filename: 'file',
      },
    },
    // createdBy: '5de9a29642ca551f24c596ba',
    // updatedBy: '5de9a29642ca551f24c596ba',
    // updatedAt_utc: '2020-01-23T21:45:20.833Z',
    // updatedAt_offset: '+00:00',
    // createdAt_utc: '2020-01-23T21:45:20.833Z',
    // createdAt_offset: '+00:00',
  },
];
