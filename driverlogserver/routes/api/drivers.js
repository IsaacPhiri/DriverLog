const express = require('express');
const router = express.Router();
const requireAdmin = require('../../middleware/authMiddleware');

// Load Driver model
const Driver = require('../../models/Driver');

// @route GET api/drivers/test
// @description tests drivers route
// @access Public
router.get('/test', (req, res) =>
  res.send('driver route testing!')
);

// @route GET api/drivers
// @description Get all drivers
// @access Public
router.get('/', requireAdmin, async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(404).json({ error: 'No drivers found' });
  }
});

// @route GET api/drivers/:id
// @description Get single driver by ID
// @access Public
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'No driver found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(404).json({ error: 'No driver found' });
  }
});

// @route PUT api/drivers/:id
// @description Update driver
// @access Public
router.put('/:id', requireAdmin, (req, res) => {
  Driver.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ msg: 'Updated successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: 'Unable to update the database' });
    });
});

// @route DELETE api/drivers/:id
// @description Delete driver by id
// @access Public
router.delete('/:id', requireAdmin, (req, res) => {
  Driver.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ msg: 'Driver entry deleted successfully' });
    })
    .catch(err => {
      res.status(404).json({ error: 'No such driver in the database' });
    });
});

module.exports = router;