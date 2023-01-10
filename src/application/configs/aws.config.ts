import { S3 } from 'aws-sdk';

export class AwsConfigService {
  constructor(private s3: S3) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  getS3() {
    return this.s3;
  }
}
