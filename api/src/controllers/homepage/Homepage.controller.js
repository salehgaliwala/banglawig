const { prepare } = require("../../helpers");

class Homepage {
        fetchHomepage(req, res, next){
                const result = [
                          {
                            id: 1,
                            sectionType: 'slider',
                            sectionTitle: 'slider',
                            sectionIcon: '',
                            bgColor: '',
                            order: 1,
                            isActive: 1,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: [
                              {
                                id: 1,
                                homepageSectionId: '1',
                                title: 'STYLISH',
                                slug: '',
                                left: '5%',
                                right: 'auto',
                                imageUrl: 'assets/sliders/female.webp',
                                description: null,
                                width: 1800,
                                height: 400,
                                content: 'Be whatever you wanna be',
                                created_at: null,
                                updated_at: '2021-12-20T07:56:21.000000Z'
                              },
                              {
                                id: 2,
                                homepageSectionId: '1',
                                title: 'FRIENDS',
                                slug: '',
                                left: '5%',
                                right: 'auto',
                                imageUrl: 'assets/sliders/girls.webp',
                                description: null,
                                width: 1800,
                                height: 400,
                                content: 'We are friends forever',
                                created_at: null,
                                updated_at: '2021-12-20T07:57:43.000000Z'
                              },
                              {
                                id: 3,
                                homepageSectionId: '1',
                                title: 'PERFECT',
                                slug: '',
                                left: 'auto',
                                right: '5%',
                                imageUrl: 'assets/sliders/wig.webp',
                                description: null,
                                width: null,
                                height: null,
                                content: 'Make your day perfect',
                                created_at: null,
                                updated_at: '2021-12-20T07:55:51.000000Z'
                              },
                            ]
                          },
                          {
                            id: 14,
                            sectionType: 'emergency',
                            sectionTitle: 'How we process with customer',
                            sectionIcon: '',
                            bgColor: 'How we process',
                            order: 2,
                            isActive: 1,
                            created_at: null,
                            updated_at: '2022-03-24T09:04:43.000000Z',
                            sectioncontent: [
                              {
                                id: 23,
                                homepageSectionId: '14',
                                title: '100% replacement guarantee',
                                slug: '',
                                imageUrl: 'assets/icon/return-policy.svg',
                                description: '',
                                width: null,
                                height: null,
                                content: 'Eligible products will be replaced within 10 days from receiving. ',
                                created_at: null,
                                updated_at: '2022-03-24T09:53:53.000000Z'
                              },
                              {
                                id: 24,
                                homepageSectionId: '14',
                                title: 'Fastest delivery',
                                slug: '',
                                imageUrl: 'assets/icon/fast-delivery.svg',
                                description: '',
                                width: null,
                                height: null,
                                content: 'Our goal is to deliver stock wigs ',
                                created_at: null,
                                updated_at: '2022-03-24T09:58:39.000000Z'
                              },
                              {
                                id: 25,
                                homepageSectionId: '14',
                                title: 'Be your own designer',
                                slug: '',
                                imageUrl: 'assets/icon/be-own-designer.svg',
                                description: '',
                                width: null,
                                height: null,
                                content: 'Design your own wig as you prefer! ',
                                created_at: null,
                                updated_at: '2022-03-24T09:58:57.000000Z'
                              },
                              {
                                id: 26,
                                homepageSectionId: '14',
                                title: 'Easy payments',
                                slug: '',
                                imageUrl: 'assets/icon/easy-payment.svg',
                                description: '',
                                width: null,
                                height: null,
                                content: 'You can pay via bank, credit cards, PayPal etc.',
                                created_at: null,
                                updated_at: '2022-03-24T09:59:12.000000Z'
                              }
                            ]
                          },
                          {
                            id: 4,
                            sectionType: 'products',
                            sectionTitle: 'We Provide Premium Products',
                            sectionIcon: '',
                            bgColor: '',
                            order: 3,
                            isActive: 1,
                            created_at: null,
                            updated_at: '2021-12-13T10:54:04.000000Z',
                            sectioncontent: [
                              {
                                id: 4,
                                homepageSectionId: '4',
                                title: 'Premium Products',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/utmlzvx1k45fg3y86jo7nwbd9ah0es.png',
                                description: null,
                                width: 90,
                                height: 10,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T10:24:44.000000Z'
                              },
                              {
                                id: 7,
                                homepageSectionId: '4',
                                title: 'Order tracking',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/htm0k71nzgf6ysvlxjeio3db9qw8r4.png',
                                description: null,
                                width: 90,
                                height: 10,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T10:24:56.000000Z'
                              },
                              {
                                id: 8,
                                homepageSectionId: '4',
                                title: 'Return Policy',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/hzt0r9scj7lfouygqv12ewp8bmkn5d.png',
                                description: null,
                                width: 90,
                                height: 10,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T10:25:07.000000Z'
                              },
                              {
                                id: 9,
                                homepageSectionId: '4',
                                title: 'Customer Care',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/30xnh1s8ykma5294bzofgrvwe67iuj.png',
                                description: null,
                                width: 90,
                                height: 10,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T10:25:16.000000Z'
                              }
                            ]
                          },
                          {
                            id: 3,
                            sectionType: 'category',
                            sectionTitle: 'Popular Brands We Collaborate',
                            sectionIcon: '',
                            bgColor: '',
                            order: 3,
                            isActive: 1,
                            created_at: null,
                            updated_at: '2021-12-14T05:54:45.000000Z',
                            sectioncontent: [
                              {
                                id: 2,
                                homepageSectionId: '3',
                                title: 'Catalyst',
                                slug: '',
                                imageUrl: 'assets/brands/catalyst.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T06:48:23.000000Z'
                              },
                              {
                                id: 3,
                                homepageSectionId: '3',
                                title: 'Hair Skeen',
                                slug: '',
                                imageUrl: './assets/brands/hairskeen.jpg',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T06:47:44.000000Z'
                              },
                              {
                                id: 29,
                                homepageSectionId: '3',
                                title: 'Hairfax',
                                slug: '',
                                imageUrl: './assets/brands/hairfax.jpg',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T06:47:55.000000Z'
                              },
                              {
                                id: 30,
                                homepageSectionId: '3',
                                title: 'ADTN',
                                slug: '',
                                imageUrl: './assets/brands/ADTN.jpg',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T06:48:11.000000Z'
                              },
                              {
                                id: 31,
                                homepageSectionId: '3',
                                title: 'Lamour',
                                slug: '',
                                imageUrl: './assets/brands/lamour.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T06:48:38.000000Z'
                              },
                              {
                                id: 33,
                                homepageSectionId: '3',
                                title: '3CR Bioscince',
                                slug: '',
                                imageUrl: './assets/brands/3crbioscince.jpg',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              // {
                              //   id: 34,
                              //   homepageSectionId: '3',
                              //   title: 'OPPO',
                              //   slug: 'category/phone-cover/phone-cover-detail/oppo',
                              //   imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/g3c1kbioevna584h06qd729ftxmwrp.png',
                              //   description: null,
                              //   width: null,
                              //   height: null,
                              //   content: '',
                              //   created_at: null,
                              //   updated_at: null
                              // },
                              // {
                              //   id: 35,
                              //   homepageSectionId: '3',
                              //   title: 'ONE PLUS',
                              //   slug: 'category/phone-cover/phone-cover-detail/one-plus',
                              //   imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/w2u5acq4rtldkjn3b9x68psoze70yi.png',
                              //   description: null,
                              //   width: null,
                              //   height: null,
                              //   content: '',
                              //   created_at: null,
                              //   updated_at: null
                              // }
                            ]
                          },
                          {
                            id: 5,
                            sectionType: 'Brand',
                            sectionTitle: 'Brand',
                            sectionIcon: '',
                            bgColor: '',
                            order: 5,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: [
                              {
                                id: 5,
                                homepageSectionId: '5',
                                title: '',
                                slug: '',
                                imageUrl: '',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              }
                            ]
                          },
                          {
                            id: 6,
                            sectionType: 'slider',
                            sectionTitle: 'Popular Phone Cover Brands',
                            sectionIcon: '',
                            bgColor: '',
                            order: 5,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: [
                              {
                                id: 11,
                                homepageSectionId: '6',
                                title: 'Banner 2',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/y7uti5w0z1xfpsa2ndq6orcl3meh4b.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 12,
                                homepageSectionId: '6',
                                title: 'Banner 2',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/vkpxm1q90ha467yznwfioe28td3jcb.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 13,
                                homepageSectionId: '6',
                                title: 'Banner 4',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/0s2i84f97cdvo3mpkg6lhrbq51jtyw.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 14,
                                homepageSectionId: '6',
                                title: 'Banner 5',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/q8fn6grs07pm3ly21wzvuok9ihbea5.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              }
                            ]
                          },
                          {
                            id: 7,
                            sectionType: 'banner_grid',
                            sectionTitle: 'Available Designs',
                            sectionIcon: '',
                            bgColor: '',
                            order: 6,
                            isActive: 0,
                            created_at: null,
                            updated_at: '2021-12-14T05:03:17.000000Z',
                            sectioncontent: [
                              {
                                id: 15,
                                homepageSectionId: '7',
                                title: 'Banner 5',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/s3xmtv1uyij7kfbqap8o2509l4wznr.webp',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 16,
                                homepageSectionId: '7',
                                title: 'Banner',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/enliks2bh87at61jd0om9ycwxp5qvf.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 17,
                                homepageSectionId: '7',
                                title: 'Banner',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/c402osgklzjhamxqne9d1y3utbvfpr.webp',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-16T04:17:24.000000Z'
                              }
                            ]
                          },
                          {
                            id: 8,
                            sectionType: 'banner',
                            sectionTitle: 'Enjoy shopping premium products',
                            sectionIcon: '',
                            bgColor: '',
                            order: 7,
                            isActive: 0,
                            created_at: null,
                            updated_at: '2021-12-14T09:11:25.000000Z',
                            sectioncontent: [
                              {
                                id: 19,
                                homepageSectionId: '8',
                                title: 'Rongobuy Slider 1',
                                slug: '',
                                imageUrl: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/ru1kxvcg4ldzpa2qtejf87iwm6hsno.webp',
                                description: null,
                                width: 100,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: '2021-12-14T10:25:43.000000Z'
                              }
                            ]
                          },
                          {
                            id: 9,
                            sectionType: 'Under Category',
                            sectionTitle: 'Under Category',
                            sectionIcon: '',
                            bgColor: '',
                            order: 8,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: [
                              {
                                id: 20,
                                homepageSectionId: '9',
                                title: 'Under Category 1',
                                slug: 'category/',
                                imageUrl: 'http://media.rongobuy.com/p/product/o45m1wrubfl30pyjastcgi6xzknhq7.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 21,
                                homepageSectionId: '9',
                                title: 'Under Category 2',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/3b24nwry06zjmliaqdpxhceosgku1t.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 22,
                                homepageSectionId: '9',
                                title: 'Under Category 3',
                                slug: '',
                                imageUrl: 'http://media.rongobuy.com/p/product/r7ocgdipwkh1xafy6zntv8e9l5024q.png',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              }
                            ]
                          },
                          {
                            id: 10,
                            sectionType: 'Best Selling',
                            sectionTitle: 'Best Selling',
                            sectionIcon: '',
                            bgColor: '',
                            order: 9,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: []
                          },
                          {
                            id: 11,
                            sectionType: 'pop holder',
                            sectionTitle: 'pop holder',
                            sectionIcon: '',
                            bgColor: '',
                            order: 10,
                            isActive: 0,
                            created_at: null,
                            updated_at: '2021-12-14T10:45:55.000000Z',
                            sectioncontent: []
                          },
                          {
                            id: 12,
                            sectionType: 'Banner 4',
                            sectionTitle: 'Banner 4',
                            sectionIcon: '',
                            bgColor: '',
                            order: 11,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: []
                          },
                          {
                            id: 13,
                            sectionType: 'Custom Review',
                            sectionTitle: 'Custom Review',
                            sectionIcon: '',
                            bgColor: '',
                            order: 12,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: []
                          },
                          {
                            id: 15,
                            sectionType: 'video',
                            sectionTitle: 'What Customer Say About Us',
                            sectionIcon: '',
                            bgColor: '',
                            order: 20,
                            isActive: 0,
                            created_at: null,
                            updated_at: null,
                            sectioncontent: [
                              {
                                id: 27,
                                homepageSectionId: '15',
                                title: 'About Our Products',
                                slug: '',
                                imageUrl: '_aCeAMrh-wo',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              },
                              {
                                id: 28,
                                homepageSectionId: '15',
                                title: 'About Our Service',
                                slug: '',
                                imageUrl: '_aCeAMrh-wo',
                                description: null,
                                width: null,
                                height: null,
                                content: '',
                                created_at: null,
                                updated_at: null
                              }
                            ]
                          }
                        ];

                return res.json(prepare(result));
        }
}

module.exports = new Homepage();