module.exports = {
  alias: 'Placeholder Management Token Alias',
  publish_unpublished_env: {
    contentTypes: [
      'placeholder content type',
    ],
    sourceEnv: 'placeholder source env',
    locale: 'placeholder locale',
    environments: [
      'placeholder env',
    ],
    bulkPublish: true,
  },
  publish_assets: {
    environments: [
      'placeholder env',
    ],
    folderUid: 'placeholder folder uid',
    bulkPublish: true,
    locales: [
      'placeholder locale',
    ],
  },
  publish_entries: {
    contentTypes: [
      'placeholder content type',
    ],
    locales: [
      'placeholder locale',
    ],
    bulkPublish: true,
    environments: [
      'placeholder env',
    ],
    publishAllContentTypes: false,
  },
  Unpublish: {
    filter: {
      environment: 'placeholder env',
      content_type_uid: 'placeholder content type',
      locale: 'placeholder locale',
      type: 'placeholder types',
    },
    deliveryToken: 'placeholder delivery token',
    bulkUnpublish: true,
  },
  cross_env_publish: {
    filter: {
      environment: 'placeholder env',
      content_type_uid: 'placeholder content type',
      locale: 'placeholder locale',
      type: 'placeholder types',
    },
    deliveryToken: 'placeholder delivery token',
    destEnv: [
      'placeholder env',
    ],
    bulkPublish: true,
  },
  publish_edits_on_env: {
    contentTypes: [
      'placeholder content type',
    ],
    sourceEnv: 'placeholder source env',
    environments: [
      'placeholder env',
    ],
    locales: [
      'placeholder locale',
    ],
    bulkPublish: true,
  },
  nonlocalized_field_changes: {
    sourceEnv: 'placeholder env',
    contentTypes: [
      'placeholder content type',
    ],
    environments: [
      'placeholder env',
    ],
    bulkPublish: true,
  },
  addFields: {
    deleteFields: [
      'updated_by',
      'created_by',
      'created_at',
      'updated_at',
      '_version',
      'ACL',
    ],
    locales: [
      'placeholder locale',
    ],
    contentTypes: [
      'placeholder content type',
    ],
    environments: [
      'placeholder env',
    ],
    defaults: {
      number: null,
      boolean: false,
      isodate: [],
      file: null,
      reference: [],
    },
    bulkPublish: true,
  },
}
