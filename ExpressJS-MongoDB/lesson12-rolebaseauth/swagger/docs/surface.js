
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         slug:
 *           type: string
 *         title:
 *           type: string
 *       example:
 *         _id: 66aabbccddeeff0011223344
 *         slug: home-furniture
 *         title: Home Furniture
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         productID:
 *           type: string
 *         slug:
 *           type: string
 *         thumbnail:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         description:
 *           type: string
 *         active:
 *           type: boolean
 *       example:
 *         _id: 66aabbccddeeff0011223344
 *         productID: PRD-001
 *         slug: office-chair
 *         thumbnail: /uploads/chair.jpg
 *         images: [/uploads/chair.jpg, /uploads/chair2.jpg]
 *         title: Office Chair
 *         price: 150
 *         category:
 *           _id: 66aabbccddeeff0011223344
 *           slug: furniture
 *           title: Furniture
 *         description: Comfortable office chair with adjustable height.
 *         active: true
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullname:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, mod, user]
 *       example:
 *         _id: 66aabbccddeeff0011223344
 *         fullname: John Doe
 *         email: john@example.com
 *         phone: "+994501112233"
 *         role: user
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/product/search:
 *   get:
 *     summary: Search products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query text
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Single product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: mypassword123
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
