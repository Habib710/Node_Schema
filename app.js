const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

// schema..

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name for this product'],
      trim: true,
      unique: true,
      minLenght: [3, 'name must be at last 3 letter'],
      maxLenght: [100, 'name must be lass than 100 letter'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'liter', 'pcs'],
        message: 'unit should kg or liter or pcs',
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value)
          if (isInteger) {
            return true
          } else {
            return false
          }
        },
      },
      message: 'hgfhgfhg',
    },

    stauts: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: 'erroe',
      },
    },

    createAt: {
      type: Date,
      default: Date.now,
    },
    upDateAt: {
      type: Date,
      default: Date.now,
    },
    categories: [
      {
        name: {
          type: String,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Schema .... Model....Query......

const Product = mongoose.model('product', productSchema)

app.get('/', (req, res) => {
  res.send('Route is working! YaY!')
})

// posting to database................

app.post('/api/v1/product', async (req, res, next) => {
  try {
    // Save.....
    const product = new Product(req.body)
    const result = await product.save()

    res.status(200).json({
      stauts: 'success',
      message: 'Data inserted',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      stauts: 'fail',
      message: "Data doesn't inserted",
      error: error.message,
    })
  }
})

module.exports = app
