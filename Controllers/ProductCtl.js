const Product = require("../Models/Product");
const shortid = require("shortid");
const slugify = require("slugify");
const Fuse = require('fuse.js');
const categoryModel =require("../Models/category");
const BrandModel = require('../Models/Brand');

const { uploadToS3 } = require("../middleware/Uploads");

exports.createProduct = (req, res) => {
  const {
    name,
    short_desc,
    long_desc,
    additional_info,
    ship_policy,
    price,
    sale_price,
    sku,
    Collection_Name,
    installation_method,
    thickness,
    wear_layer_thickness,
    width,
    length,
    review,
    ratings,
    stock,
    BestSeller,
    newProduct,
    IsmostViewed,
    isDiscount,
    featured,
    sold,
    SuperCatID,
    SuperCatName,
    CatID,
    CatName,
    SubCatID,
    SubCatName,
    BrandID,
    BrandName,
    BoxPrice,
    BoxCoverage,
    productPictures,
    color,
    createdBy,
    Manufacture,
    Application,
    Product_Type,
    Commercial_Warranty,
    Certifation,
    Core_Type_Detail,
    Years,
    Edge_Type,
    Coverage_sqft,
    length_cm,
    Format_in,
    Manufacturer_color,
    length_in_fraction,
    Shape,
    Recidential_warranty,
    Underpad_attached,
    updatedAt,
  } = req.body;
  const product = new Product({
    name,
    slug: slugify(name),
    short_desc,
    long_desc,
    additional_info,
    ship_policy,
    price,
    sale_price,
    sku,
    Collection_Name,
    installation_method,
    thickness,
    wear_layer_thickness,
    width,
    length,
    review,
    ratings,
    stock,
    BestSeller,
    newProduct,
    IsmostViewed,
    IsmostViewed,
    isDiscount,
    featured,
    sold,
    SuperCatID,
    SuperCatName,
    CatID,
    CatName,
    SubCatID,
    SubCatName,
    BrandID,
    BrandName,
    BoxPrice,
    BoxCoverage,
    productPictures,
    color,
    createdBy,
    Manufacture,
    Application,
    Product_Type,
    Commercial_Warranty,
    Certifation,
    Core_Type_Detail,
    Years,
    Edge_Type,
    Coverage_sqft,
    length_cm,
    Format_in,
    Manufacturer_color,
    length_in_fraction,
    Shape,
    Recidential_warranty,
    Underpad_attached,
    updatedAt: new Date(),
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.getProducts = async (req, res) => {
  try {
    const isAddon = req.query.isAddon;
    let boolOutput = isAddon === "true";
    const get = await Product.find();
    const minprice = req.query.minprice || "";
    const maxprice = req.query.maxprice || "";
    const color = req.query.color || "";
    const filter = get.filter((item) => item.isAddon === boolOutput);
    if (get.length === 0) {
      res.status(400).json({ error: "No Products Found" });
    } else {
      const colorfilter = filter.filter((item) => item.color === color);
      const priceFilter = filter.filter(
        (item) => item.sale_price <= maxprice && item.sale_price >= minprice
      );
      const filter2 = colorfilter.filter(
        (item) => item.sale_price <= maxprice && item.sale_price >= minprice
      );
      if (!color == "" && !minprice == "") {
        res.status(200).json({ filter: filter2 });
      } else if (!color == "") {
        res.status(200).json({ filter: colorfilter });
      } else if (!minprice == "") {
        res.status(200).json({ filter: priceFilter });
      } else {
        res.status(200).json({ filter: filter });
      }
    }
  } catch {
    (err) => res.json(err);
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const get = await Product.find();
    const search = req.query.name || "";
    const cat = req.query.cat || "";
    const sub_cat = req.query.sub_cat || "";
    const minprice = req.query.minprice || "";
    const maxprice = req.query.maxprice || "";
    const color = req.query.color || "";
    const brand = req.query.brand || "";
    const collection = req.query.collection || "";
    const installMethod = req.query.installMethod || "";
    const thickness = req.query.thickness || "";
    const width = req.query.width || "";
    const length = req.query.length || "";
    const wearlayerthickness = req.query.wearlayerthickness || "";
    if (brand!=="" && cat==""&& sub_cat=="" ) {
      const filter = get.filter((item) => item.BrandName === brand);
      res.status(200).json({ catData: filter.reverse() });
    }
    if (search) {
      Product.find({ name: { $regex: search, $options: "$i" } }).then(
        (data) => {
          if (data === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            const filter = data.filter((item) => item.color === color);
            const priceFilter = data.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            if (!color == "" && !minprice == "") {
              res.status(200).json({ data: filter2.reverse() });
            } else if (!color == "") {
              res.status(200).json({ data: filter.reverse() });
            } else if (!minprice == "") {
              res.status(200).json({ data: priceFilter.reverse() });
            } else {
              res.status(200).json({ data: data.reverse() });
            }
          }
        }
      );
    } else if (cat) {
      Product.find({ CatName: { $regex: cat, $options: "i" } }).then(
        (catData) => {
          console.log(catData);
          if (catData === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            const filter = catData.filter((item) => item.color === color);
            const priceFilter = catData.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filterBrand = catData.filter(
              (item) => item.BrandName === brand
            );
            const filterCollection = catData.filter(
              (item) => item.Collection_Name === collection
            );
            const filterInstallationMethod = catData.filter(
              (item) => item.installation_method === installMethod
            );
            const filterThickness = catData.filter(
              (item) => item.thickness === thickness
            );
            const filterWidth = catData.filter((item) => item.width === width);
            const filterLength = catData.filter(
              (item) => item.length === length
            );
            const filterWerelayerThickness = catData.filter(
              (item) => item.wear_layer_thickness === wearlayerthickness
            );
            if (color !== "" && minprice !== "") {
              res.status(200).json({ catData: filter2.reverse() });
            } else if (color !== "") {
              res.status(200).json({ catData: filter.reverse() });
            } else if (minprice !== "") {
              res.status(200).json({ catData: priceFilter.reverse() });
            } else if (brand !== "") {
              res.status(200).json({ catData: filterBrand.reverse() });
            } else if (collection !== "") {
              res.status(200).json({ catData: filterCollection.reverse() });
            } else if (installMethod !== "") {
              res
                .status(200)
                .json({ catData: filterInstallationMethod.reverse() });
            } else if (thickness !== "") {
              res.status(200).json({ catData: filterThickness.reverse() });
            } else if (width !== "") {
              res.status(200).json({ catData: filterWidth.reverse() });
            } else if (length !== "") {
              res.status(200).json({ catData: filterLength.reverse() });
            } else if (wearlayerthickness !== "") {
              res
                .status(200)
                .json({ catData: filterWerelayerThickness.reverse() });
            } else {
              res.status(200).json({ catData: catData.reverse() });
            }
          }
        }
      );
    } else if (sub_cat) {
      Product.find({ SubCatName: { $regex: sub_cat, $options: "i" } })
        .then((catData) => {
          if (catData === 0) {
            res.status(400).json({ error: "No Products Found" });
          } else {
            console.log(catData);
            const filter = catData.filter((item) => item.color === color);
            const priceFilter = catData.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filter2 = filter.filter(
              (item) =>
                item.sale_price <= maxprice && item.sale_price >= minprice
            );
            const filterBrand = catData.filter(
              (item) => item.BrandName === brand
            );
            const filterInstallationMethod = catData.filter(
              (item) => item.installation_method === installMethod
            );
            const filterThickness = catData.filter(
              (item) => item.thickness === thickness
            );
            const filterCollection = catData.filter(
              (item) => item.Collection_Name === collection
            );

            const filterWidth = catData.filter((item) => item.width === width);
            const filterLength = catData.filter(
              (item) => item.length === length
            );
            const filterWerelayerThickness = catData.filter(
              (item) => item.wear_layer_thickness === wearlayerthickness
            );
            if (color !== "" && minprice !== "") {
              res.status(200).json({ catData: filter2.reverse() });
            } else if (color !== "") {
              res.status(200).json({ catData: filter.reverse() });
            } else if (minprice !== "") {
              res.status(200).json({ catData: priceFilter.reverse() });
            } else if (brand !== "") {
              res.status(200).json({ catData: filterBrand.reverse() });
            } else if (collection !== "") {
              res.status(200).json({ catData: filterCollection.reverse() });
            } else if (installMethod !== "") {
              res
                .status(200)
                .json({ catData: filterInstallationMethod.reverse() });
            } else if (thickness !== "") {
              res.status(200).json({ catData: filterThickness.reverse() });
            } else if (width !== "") {
              res.status(200).json({ catData: filterWidth.reverse() });
            } else if (length !== "") {
              res.status(200).json({ catData: filterLength.reverse() });
            } else if (wearlayerthickness !== "") {
              res
                .status(200)
                .json({ catData: filterWerelayerThickness.reverse() });
            } else {
              console.log(catData);
              res.status(200).json({ catData: catData.reverse() });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (get.length === 0) {
        res.status(400).json({ error: "No Products Found" });
      } else {
        res.status(200).json({ get: get.reverse() });
      }
    }
  } catch {
    (err) => res.json(err);
  }
};
// 3exports.getAllProducts = async (req, res) => {
//   try {
//     const get = await Product.find();
//     const search = req.query.name || "";
//     const cat = req.query.cat || "";
//     const sub_cat = req.query.sub_cat || "";
//     const minprice = req.query.minprice || "";
//     const maxprice = req.query.maxprice || "";
//     const color = req.query.color || "";
//     const brand = req.query.brand || "";

//     if (search) {
//       Product.find({ name: { $regex: search, $options: "$i" } }).then(
//         (data) => {
//           if (data === 0) {
//             res.status(400).json({ error: "No Products Found" });
//           } else {
//             const filter = data.filter((item) => item.color === color);
//             const priceFilter = data.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );
//             const filter2 = filter.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );

//             if (!color == "" && !minprice == "") {
//               res.status(200).json({ data: filter2.reverse() });
//             } else if (!color == "") {
//               res.status(200).json({ data: filter.reverse() });
//             } else if (!minprice == "") {
//               res.status(200).json({ data: priceFilter.reverse() });
//             } else {
//               res.status(200).json({ data:data.reverse() });
//             }
//           }
//         }
//       );
//     } else if (cat) {
//       Product.find({ CatName: { $regex: cat, $options: "i" } }).then(
//         (catData) => {
//           if (catData === 0) {
//             res.status(400).json({ error: "No Products Found" });
//           } else {
//             const filter = catData.filter((item) => item.color === color);
//             const priceFilter = catData.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );
//             const filter2 = filter.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );
//             const filterBrand = catData.filter((item) => item.BrandName === brand);

//             if (!color == "" && !minprice == "") {
//               res.status(200).json({ catData: filter2.reverse() });
//             } else if (!color == "") {
//               res.status(200).json({ catData: filter.reverse() });
//             } else if (!minprice == "") {
//               res.status(200).json({ catData: priceFilter.reverse() });
//             }else if (!brand == "") {
//               res.status(200).json({ catData: filterBrand.reverse() });
//             }else {
//               res.status(200).json({ catData:catData.reverse() });
//             }
//           }
//         }
//       );
//     } else if (sub_cat) {
//       console.log(sub_cat);
//       Product.find({ SubCatName: { $regex: sub_cat, $options: "i" } })
//         .then((catData) => {
//           if (catData === 0) {
//             res.status(400).json({ error: "No Products Found" });
//           } else {
//             const filter = catData.filter((item) => item.color === color);
//             const priceFilter = catData.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );
//             const filter2 = filter.filter(
//               (item) =>
//                 item.sale_price <= maxprice && item.sale_price >= minprice
//             );
//             const filterBrand = catData.filter((item) => item.BrandName === brand);

//             if (!color == "" && !minprice == "") {
//               res.status(200).json({ catData: filter2.reverse() });
//             } else if (!color == "") {
//               res.status(200).json({ catData: filter.reverse() });
//             } else if (!minprice == "") {
//               res.status(200).json({ catData: priceFilter.reverse() });
//             }else if (!brand == "") {
//               res.status(200).json({ catData: filterBrand.reverse() });
//             }
//             else {
//               res.status(200).json({ catData:catData.reverse() });
//             }
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       if (get.length === 0) {
//         res.status(400).json({ error: "No Products Found" });
//       } else {
//         res.status(200).json({ get:get.reverse() });
//       }
//     }
//   } catch {
//     (err) => res.json(err);
//   }
// };
exports.getProductDetailsById = (req, res) => {
  const { id } = req.params;
  if (id) {
    Product.findOne({ _id: id }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const user = await Product.find({ slug: req.params.slug });
    res.json(user);
  } catch (err) {
    res.json({ err });
  }
};

exports.deleteProductById = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ err });
    } else {
      res.json(data);
    }
  });
};

// const Fuse = require('fuse.js');

exports.getAllProductsBySearch = async(req, res) => {
  const search = req.query.search;
  const get = await Product.find();

  if (!search) {
    return res.status(400).json({ error: 'Search term is required.' });
  }

  // Assuming Product is an array of products
  const products = get.map((product) => ({ item: product })); // Wrap each product in an object

  const fuseOptions = {
    keys: ['item.name'], // Specify the correct path to the name property
    threshold: 0.3,
  };

  try {
    const fuse = new Fuse(products, fuseOptions);
    const result = fuse.search(search);
    const filteredProducts = result.map((item) => item.item).slice(0, 10);

    res.json({ products: filteredProducts.reverse() });
  } catch (error) {
    console.error('Error creating Fuse instance or searching:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};



exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};
exports.updateProductById = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};
exports.fileData = async (req, res) => {
  try {
    let productPictures = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const fileData = file.buffer;
        let fileType = "";
        if (file.mimetype === "application/pdf") {
          fileType = "pdf";
        } else if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/jpg"
        ) {
          fileType = "jpg";
        } else if (file.mimetype === "image/png") {
          fileType = "png";
        } else if (file.mimetype === "video/mp4") {
          fileType = "video/mp4";
        } else {
          return res.json({ error: "Unsupported file type" });
        }
        const uploadResults = await uploadToS3([{ fileData }], fileType);
        for (const result of uploadResults) {
          productPictures.push(result.Location);
        }
      }
    }
    await Product.findOneAndUpdate({ _id: req.params.id }, { productPictures });
    res.status(200).json({
      message: "files updated successfully",
      productPictures: productPictures,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getCatId= async (name,type)=>{
const getCat = await categoryModel.find();
let mainCat=getCat.filter((item)=>item.name==name && item.Type==type);

  // console.log(608,`===>${name}========> `,mainCat[0]?._id.toString())

return mainCat[0]?._id.toString();
}
const getBrandId= async (name)=>{
const getBrand = await BrandModel.find();
let brand=getBrand.filter((item)=>item.brand_name==name);
// console.log(609,`======>${name} =====> `,brand[0]?._id.toString());
return brand[0]?._id.toString();
}




exports.productBulkUpload = async (req, res) => {
  try {
    const productsData = req.body; // Assuming an array of products is sent in the request body

    // Map the array to create an array of Product instances
    const products = await Promise.all(productsData.map(async (productData) => {
      const superCatId = await getCatId(productData.SuperCatName, "Super_Cat");
      const catId = await getCatId(productData.CatName, "Cat");
      const subCatId = await getCatId(productData.SubCatName, "Sub_cat");
      const brandId = await getBrandId(productData.BrandName);

      return new Product({
        ...productData,
        slug: slugify(productData.name),
        updatedAt: new Date(),
        SuperCatID: superCatId,
        CatID: catId,
        SubCatID: subCatId,
        BrandID: brandId,
      });
    }));

    // Use the insertMany method to perform bulk insert
    const insertedProducts = await Product.insertMany(products);
    res.status(201).json({ products: insertedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





