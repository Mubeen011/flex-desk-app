#!/bin/bash

echo "Building and deploying frontend to S3..."

# Install dependencies (Make sure you're in the correct directory for package.json)
npm install
npm install date-fns
npm install framer-motion

# Build the frontend application (Assumes React build output goes to './build')
npm run build

# Install AWS CLI for deployment (if not already installed)
apt-get update && apt-get install -y awscli 

# Debugging - Print environment variables
echo "Checking environment variables......"
env | grep AWS

# Ensure AWS credentials are set...
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then 
  echo "AWS credentials not set"; exit 1; 
fi

# Optionally print out the AWS region (for debugging)
echo "AWS region: $AWS_REGION"
echo "AWS access key id : $AWS_ACCESS_KEY_ID"

# Configure AWS CLI with the provided credentials and region
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_REGION

# Sync build folder to S3 bucket (After successful npm build)
if [ -d "./build" ]; then
  aws s3 sync ./build s3://$S3_BUCKET_NAME --delete
else
  echo "Build folder does not exist. Build step may have failed."; exit 1;
fi

# Invalidate CloudFront distribution (clear cache)
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront cache for distribution $CLOUDFRONT_DISTRIBUTION_ID..."
  
  # Create an invalidation request for CloudFront
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
else
  echo "CloudFront distribution ID is not set. Skipping invalidation.";
fi

echo "Frontend deployed and CloudFront invalidated successfully."
