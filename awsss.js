'use strict';
module.exports = function(AWS,region, bucketName){
    AWS.config.region = region || process.env.AWS_REGION || 'us-east-1';
    bucketName = bucketName || process.env.BUCKET_NAME || 'npme-auth';
    var s3bucket = new AWS.S3();

    function getBucket(cb){
      s3bucket.listBuckets(function(err,data) {
        if(err){
          return cb(err);
        }
        if(bucketName in data.buckets){
          //we have it
          return cb(null,data.buckets[bucketName]);
        }
      });
    }

    function upload(cb){
      var params = {Bucket: bucketName};
      s3bucket.upload(params, function(err, data) {
        if (err) {
          console.log("Error uploading data: ", err);
          return cb(err);
        }
        console.log("Successfully uploaded data to myBucket/myKey");
        return cb(null,data);
      });
    }

    /**
     * Get access control list for a bucket.
     * @param {string} bucket - Name of the bucket, optional
     * @param {function} cb - The callback function
     * @returns {void}
     */
    function getAcl(bucket,cb){
      var params = {Bucket: bucketName};
      if(typeof bucket === 'function'){
        cb = bucket;
      } else {
          params.bucketName = bucket;
      }
      /**
       * DOCS: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getBucketAcl-property -- Callback Parameters:
       * @param {Error} err — the error object returned from the request. Set to null if the request is successful.
       * @param {object} data — the de-serialized data returned from the request. Set to null if a request error occurs. The data object has the following properties:
       * @param {object} data.Owner - the owner object
       * @param {string} data.Owner.DisplayName - Screen name of the owner.
       * @param {string} data.Owner.ID - The canonical user ID of the owner.
       * @param {object[]} data.Grants —  A list of grants.
       * @param {object} data.Grants.[i].Grantee
       * @param {string} data.Grants.[i].Grantee.DisplayName — Screen name of the grantee.
       * @param {string} data.Grants.[i].Grantee.EmailAddress — Email address of the grantee.
       * @param {string} data.Grants.[i].Grantee.ID — The canonical user ID of the grantee.
       * @param {string} data.Grants.[i].Grantee.Type — required — Type of grantee Possible values include: "CanonicalUser" "AmazonCustomerByEmail" "Group"
       * @param {string} data.Grants.[i].Grantee.URI — URI of the grantee group.
       * @param {string} data.Grants.[i].Permission — Specifies the permission given to the grantee. Possible values include:
       *       "FULL_CONTROL"
       *       "WRITE"
       *       "WRITE_ACP"
       *       "READ"
       *       "READ_ACP"
       *
       * @returns {void}
       */
      s3bucket.getBucketAcl(params,function(err,data){
        if(err){
          return cb(err);
        }
        return cb(null,data);
      });
    }

    return {
        getBucket:getBucket
      , upload:upload
      , getAcl:getAcl
    };
};
