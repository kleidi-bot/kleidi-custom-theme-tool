const express = require('express')
const nunjucks = require('nunjucks')
const app = express();
const http = require('http')
app.server = http.createServer(app);
const router = express.Router();
const path = require('path')
app.set('view engine', 'njk');
const opn = require('opn')

nunjucks.configure([
    path.join(__dirname, `./theme`)
], {
    autoescape: true,
    watch: true,
    express: app
});


const init = () => {
    /* Express Init */
    app.use('/assets', express.static(path.join(__dirname, `./theme/assets`)));
    app.use('/assets/css', express.static(path.join(__dirname, `./theme/assets/css`))); /* noty lib */
    app.use('/assets/js', express.static(path.join(__dirname, `./theme/assets/js`))); /* noty lib */
    app.use('/assets/css', express.static(path.join(__dirname, `./node_modules/noty/lib/themes`))); /* noty lib */
    app.use('/assets_custom', express.static(path.join(__dirname, `./theme/assets`)));
}

app.get('/', async (req, res) => {
    res.locals.publishable_key = 'pk_test_slfKkHXWsDu0ujo2vfvfUrcQ'
    return res.render('pages/home', {
        'page': 'home',
        'bundles': [  {
            initialPrice: '50.00',
            stockCount: 99,
            referralValue: '0.00',
            roles: [ '539605644316246026' ],
            _id: '5e1dfaf7a1d2612c62252c42',
            title: 'oof',
            type: 'stripe',
            production: true,
            interval: 'Unlimited',
            price: '0.00',
            billingPlanID: 'plan_GXzD813min8Icr',
            dateCreated: '2020-01-14T17:31:35.785Z',
            live: true,
            __v: 0
          }],
        'currency': 'USD',
        'user': {

        },
        'referral': 'exampleCode',
        'password': false,
        'subscribed': false
    });
})

app.get('/dashboard', async (req, res) => {
    res.locals.publishable_key = 'pk_test_slfKkHXWsDu0ujo2vfvfUrcQ'
    res.locals.user = {
        _id: 'j4l4j2k4j23k4j23k4j23k4j23k4j2k',
        identifier: 'j42kfkdjklj23k4j2lk4jlkjvdsf',
        discordID: '657969027377004616',
        avi: 'be55f204b2c49ea79b4a4e857f0c4394',
        username: 'test',
        discriminator: '4023',
        accessToken: 'k423jkh4j32hfdlfkj21kj3lk4jkslks',
        __v: 0
      }
    return res.render('pages/profile', {
        'general': {
            key: 'A2QCA-92WVR-AGRQD-S9FVN',
            bundle: {
              initialPrice: '40.00',
              stockCount: 71,
              referralValue: '0.00',
              roles: [ '539614330778288153' ],
              _id: '5re7193426d216sf739fsaf5',
              title: 'test',
              type: 'stripe',
              production: true,
              interval: 'Monthly',
              price: '5.00',
              billingPlanID: 'plan_GIOLrNedtE3FGI',
              dateCreated: '2019-12-04T02:26:17.198Z',
              live: true,
              __v: 0
            },
            deviceID: null,
            membership: 'test',
            email: 'admin@kleidi.io',
            referralCode: 'K_PEkx-W',
            balance: '0.00',
            nextBillingDate: 'February 13, 2020',
            cancel_at_period_end: false,
            customer: {
              id: 'cus_GXzNsaaK33Ftau',
              object: 'customer',
              account_balance: 0,
              address: null,
              balance: 0,
              created: 1579023719,
              currency: 'usd',
              default_source: null,
              delinquent: false,
              description: 'Key: A2QCA-92WVR-AGRQD-S9FVN',
              discount: null,
              email: 'admin@kleidi.io',
              invoice_prefix: 'B33F62B6',
              invoice_settings: { custom_fields: null, default_payment_method: null, footer: null },
              livemode: false,
              metadata: {},
              name: 'user name',
              phone: null,
              preferred_locales: [],
              shipping: null,
              sources: {
                object: 'list',
                data: [Array],
                has_more: false,
                total_count: 1,
                url: ''
              },
              subscriptions: {
                object: 'list',
                data: [Array],
                has_more: false,
                total_count: 2,
                url: ''
              },
              tax_exempt: 'none',
              tax_ids: {
                object: 'list',
                data: [],
                has_more: false,
                total_count: 0,
                url: ''
              },
              tax_info: null,
              tax_info_verification: null
            },
            status: 'Trialing'
          },
        'page': 'dashboard',
        'currency': 'USD'
    });
})

app.get('/soldout', async (req, res) => {
    return res.render('pages/home', {
        'page': 'home',
        'bundles': [],
        'currency': 'USD',
        'referral': 'example',
        'password': false,
        'subscribed': true
    });
})

app.get('/p/about', async (req, res) => {
    return res.render('additional_pages/about', {
    });
})

app.get('/redeem', async (req, res) => {
    return res.render('pages/redeem', {
    });
})

app.get('/password', async (req, res) => {
    return res.render('pages/home', {
        'page': 'home',
        'bundles': [],
        'currency': 'USD',
        'referral': 'example',
        'password': true,
        'subscribed': true
    });
})

app.get('/pages', async (req, res) => {
    return res.sendFile('/public/main.html', {root: __dirname })
})

const serverOpts = {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
};

init();
app.server.listen(serverOpts, () => {
    app.on('shutdown', () => {
        process.exit(0);
    });
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT || 3000}/pages`);
    opn(`http://127.0.0.1:${process.env.PORT || 3000}/pages`)
});