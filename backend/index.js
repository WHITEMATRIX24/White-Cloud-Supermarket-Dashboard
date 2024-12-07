const port = 4001;
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Item = require('./models/item');
const Invoice = require('./models/invoice');
const Banner = require('./models/banner');  
const Admin = require('./models/admin');
const User = require('./models/user');
const Tag = require('./models/tag');
const PDF = require('./models/invoicePDF');
const Agent=require('./models/agent');
const fs = require('fs');


const app = express();

app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());

//mongoose.connect("mongodb+srv://ebinjomonkottakal:fwscJgpQGiEp8amb@cluster0.iekhyww.mongodb.net/ecommerce").then(()=>{
console.log("Connected to MongoDB");
//mongoose.connect("mongodb+srv://johnathikalam:bKKjhjvcxEZ5H60q@cluster0.my87tnj.mongodb.net/store_billing").then(()=>{
mongoose.connect("mongodb+srv://wcloudsupermarket:UibdwePbFthz8Hes@cluster0.s4bulfq.mongodb.net/Whitesupermarket").then(()=>{
}).catch((error)=>{
  console.log("Mongoose Error : "+error);
})

app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/signin",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/profile",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/banner",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/banner/add",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/previous-orders",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/in-store-billing",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/orders",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/add-item",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})
app.get("/add-item/:id",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    //res.send("Express app is running")
})

app.get('/items', async (req, res) => {
  try {
    console.log(req.query);
    //const page = parseInt(req.query.page) || 9; // Get the current page from the query parameters (default to 1 if not provided)
    //const itemsPerPage = parseInt(req.query.itemsPerPage) || 24; // Get the number of items per page from the query parameters (default to 20 if not provided)

    const totalItems = await Item.countDocuments({}); // Get the total number of items
    console.log(`Total Items : ${totalItems}`);
    //const skipItems = Math.max(0, totalItems - page * itemsPerPage); // Calculate the number of items to skip

    //if (skipItems >= totalItems) {
      // If the number of items to skip is equal to or greater than the total number of items, return an empty array
      //return res.json({
      //  success: true,
      //  data: []
      //});
    //}

    const items = await Item.find({})
      .sort({_id: -1}) // Sort items in descending order by ID
      //.skip(skipItems) // Skip the items that come before the current page
      .limit(42); // Only fetch the items for the current page

    res.json({
      success: true,
      data: items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the items'
    });
  }
});

app.get('/allItems', async (req, res) => {
  try {
    const items = await Item.find({}).sort({_id: 1});

    res.json({
      success: true,
      data: items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the items'
    });
  }
});


app.post('/itemDelete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the item'
    });
  }
});
app.get('/itemEdit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the item'
    });
  }
});

app.post('/itemUpdate/:id', upload.fields([{ name: 'item_image', maxCount: 1 }, { name: 'item_hsb', maxCount: 1 }]), async (req, res) => {
  try {
    const id = req.params.id;
    const newdata = req.body;
    const categoryArray = newdata.item_catogory.split('-').map(category => category.trim());
    const tagArray = newdata.item_tags.split('-').map(tag => tag.trim());
    const newData = {
      ...newdata,
      item_catogory: categoryArray,
      item_tags: tagArray,
      updated_at: Date.now()
    };

    // Check if item_image exists in the request
    if (req.files && req.files['item_image']) {
      newData.item_image = req.files['item_image'] ? req.files['item_image'][0].buffer.toString('base64') : null;
    } else {
      delete newData.item_image; // Remove item_image field if not present
    }

    // Check if item_hsb exists in the request
    if (req.files && req.files['item_hsb']) {
      newData.item_hsb = req.files['item_hsb'] ? req.files['item_hsb'][0].buffer.toString('base64') : null;
    } else {
      delete newData.item_hsb; // Remove item_hsb field if not present
    }

    console.log(`ID : ${id}`);
    console.log(req.body);
    const item = await Item.findByIdAndUpdate(id, newData, { new: true });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the item'
    });
  }
});



app.post('/itemStore', upload.fields([{ name: 'item_image', maxCount: 1 }, { name: 'item_hsb', maxCount: 1 }]), async (req, res) => {
  const itemData = req.body;
  const { item_name, mesuring_qntty, item_mrp, discount, item_catogory,item_tags,item_hsb,item_image,instock_outstock_indication,stock_quantity} = itemData;
  if (!item_name || !mesuring_qntty || !item_mrp || !discount || !item_catogory || !item_tags || !instock_outstock_indication || !stock_quantity) {
    return res.status(400).send({ success: false, error: "Please fill in all required fields." });
  }
  const itemImage = req.files['item_image'] ? req.files['item_image'][0].buffer.toString('base64') : null;
  const itemHsb = req.files['item_hsb'] ? req.files['item_hsb'][0].buffer.toString('base64') : null;

  // Split the item_tags string into an array of tags
  const categoryArray = itemData.item_catogory.split('-').map(category => category.trim());
  const tagArray = itemData.item_tags.split('-').map(tag => tag.trim());
  
  if (!itemImage || !itemHsb) {
    return res.status(400).send({ success: false, error: "Please fill in all required fields." });
}
  try {
    const item = new Item({
      ...itemData,
      item_image: itemImage,
      item_hsb: itemHsb,
      item_catogory: categoryArray, 
      item_tags: tagArray,       
    });
    console.log(`Item: ${item}`);

    await item.save();

    res.json({
      success: true,
      message: 'Item created successfully',
      item: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the item',
    });
  }
});
app.get('/getBanner', async (req, res) => {
  try {
    const banner = await Banner.find({});
    res.json({
      success: true,
      banner: banner
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the items'
    });
  }
});

app.post('/deletehsbimg/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`ID : ${id}`);
    const item = await Banner.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the item'
    });
  }
});

app.post('/add_banner', upload.fields([ { name: 'banner_img', maxCount: 1 }]), async (req, res) => {
  const bannerData = req.body;
  const bannerHsb = req.files['banner_img'] ? req.files['banner_img'][0].buffer.toString('base64') : null;
  try {
    const banner = new Banner({
      ...bannerData,
      banner_img: bannerHsb
    });

    await banner.save();

    res.json({
      success: true,
      message: 'Item created successfully',
      item: bannerData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the item'
    });
  }
});

app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find({});

    res.json({
      success: true,
      data: tags
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the tags'
    });
  }
});


app.post('/addTag', async (req, res) => {
  try {
    const tags = req.body.tags;

    if (!tags) {
      return res.status(400).json({
        success: false,
        message: 'Tag is required'
      });
    }
    const newTag = new Tag({ tags: tags });
    await newTag.save();
    res.json({
      success: true,
      message: 'Tag created successfully',
      tag: newTag
    });
  }  catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the tag'
    });
  }
});

app.post('/uploadInvoice', upload.single('file'), async (req, res) => {
  console.log(req.file); // Add this line
  try {
    const newInvoice = new PDF();
    newInvoice.data = fs.readFileSync(req.file.path);
    newInvoice.contentType = req.file.mimetype;

    await newInvoice.save();

    res.status(200).send({ message: 'File uploaded and saved to database.' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/orderStore', upload.none(), async (req, res) => {
  try {
      const { cx_phone_number, cx_name, price, payment_mode, item_details } = req.body;

      // Check if required fields are empty
      if (!cx_phone_number || !cx_name || !price || !payment_mode || !item_details) {
          return res.status(400).send({ success: false, error: "Please fill in all required fields." });
      }

      const oba = price;
      const order_status = "Accepted";
      const order_id = Date.now().toString();
      const parsedItemDetails = JSON.parse(item_details);

      const invoice = new Invoice({
          cx_phone_number,
          cx_name,
          oba,
          payment_mode,
          order_status,
          order_id,
          order_date: Date.now(),
          item_details: parsedItemDetails,
      });

      await invoice.save();
      res.status(201).send({ success: true, data: invoice });
  } catch (error) {
      res.status(400).send({ success: false, error: error.message });
  }
});



  app.get('/order', async (req, res) => {
    try {
      const invoices = await Invoice.find({});
  
      res.json({
        success: true,
        data: invoices
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the items'
      });
    }
  });

  /*app.post('/orderStatus', upload.none(), async (req, res) => {
    const { orderId, order_status } = req.body;
    console.log(req.body)
    try {
        const invoice = await Invoice.findOne({order_id: orderId });
        console.log(orderId)
        if (!invoice) {
            return res.status(404).json({ message: 'Order not found' });
        }

        invoice.order_status = order_status;
        await invoice.save();

        res.status(201).send({ success: true, data: invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});*/

app.post('/orderStatus', upload.none(), async (req, res) => {
  const { orderId, order_status } = req.body;
  try {
      const invoice = await Invoice.findOne({order_id: orderId });
      if (!invoice) {
          return res.status(404).json({ message: 'Order not found' });
      }

      invoice.order_status = order_status;
      await invoice.save();

      const user = await User.findById(invoice.cx_id);

      if (user) {
        const userOrder = user.user_order.find(order => order.id === orderId);
        if (!userOrder) {
            return res.status(404).json({ message: 'User order not found' });
        }

        userOrder.status = order_status;
        await user.save();

        res.status(201).send({ success: true, data: { invoice, user } });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  try {
      const { phone_number, password } = req.body;
      console.log("BODY",req.body);
      
      const admin = await Admin.findOne({ phone_number: phone_number });
            console.log(admin);
      if (password == admin.password){
        res.status(200).json({ success: true, message: 'Login successful' });

      }else{
        res.status(400).json({ success: false, error: error.message });
      }
      
  } catch (error) {
      res.status(400).json({ success: false, error: error.message });
  }
});


// <<<<<<::::::Add Agent::::::>>>>>>

app.post('/addAgent',async(req,res)=>{
  const {agentName,agent_id}=req.body;
  try{
    const existingAgent=await Agent.findOne({agent_id});
    if(existingAgent){
      res.status(406).json("Agent Already Exist:::");
    }else{
      const { customAlphabet } = await import('nanoid');
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
      const nanoid =customAlphabet(alphabet,5);
      const referralCode=nanoid();
      const newAgent= new Agent({
        agentName,agent_id,referralCode
      });
      await newAgent.save();
      res.status(201).json(newAgent)
    }  
  }catch(err){
    console.log("Error at catch in addAgent::::::", err);
    res.status(500).json({ error: "Internal server error" });
  }
})





  

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port"+port);
    }
    else{
        console.log("Error : "+error);
    }
})