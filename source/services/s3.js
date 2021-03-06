/**
 * S3 service module.
 *
 * @module services/s3
 */

import AWS from 'aws-sdk';
import uuid from 'uuid';

import config from '@/configs/s3';

export default {
  /**
   * Uploads a file to S3.
   *
   * @param {File} file The File object to upload.
   */
  upload(file) {
    const s3 = new AWS.S3({
      apiVersion: config.apiVersion,
      params: {
        Bucket: config.bucket
      }
    });

    return new Promise((resolve, reject) => {
      const params = {
        ContentDisposition: `inline;filename="${file.name}"`,
        ContentType: file.type,
        Key: `pictures/${uuid()}`,
        Body: file
      };

      const callback = (err, obj) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(obj);
      };

      s3.upload(params, callback);
    });
  }
};
