export type CloudinaryProviderOptions = {
  /**
   * Default Cloudinary fetch url.
   * Check https://cloudinary.com/documentation/fetch_remote_images#fetch_and_deliver_remote_files
   * @example `https://res.cloudinary.com/demo/image/fetch/`
   */
  fetchUrl: string;
  /**
   * Optional. Will be used when image url will not start with http.
   * Check https://cloudinary.com/documentation/migration#lazy_migration_with_auto_upload
   * @example `https://api.cloudinary.com/demo/image/upload/`
   */
  uploadUrl?: string;
};
