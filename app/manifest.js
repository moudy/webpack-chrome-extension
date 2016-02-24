const manifest = {
  'name': 'Inject',
  'version': '0.0.1',
  'manifest_version': 2,
  'description': 'Inject',
  'content_scripts': [
    {'js': ['index.js'], 'matches': ['<all_urls>'], 'all_frames':true}
  ],
  'permissions': [
    'activeTab',
    'contextMenus'
  ]
};

module.exports =  manifest;

