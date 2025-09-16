import ImageKit from "imagekit"
var imagekit=new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGE_KIT_URL
});
export default imagekit