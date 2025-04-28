const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-white mb-6">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const sitemap = ["About Us", "Delivery", "Testimonials", "Contact"];
  const information = ["Menu", "Quality", "Make a Choice", "Subscriptions"];
  const contacts = [
    "1717 Harrison St, San Francisco, CA 94103, USA",
    "+1 425 326 4000",
    "quickeat@mail.net",
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="163"
                height="38"
                viewBox="0 0 163 38"
              >
                <g id="Logo" transform="translate(-260 -51)">
                  <g id="Logo-2" data-name="Logo" transform="translate(260 51)">
                    <g id="Elements">
                      <path
                        id="Path_1429"
                        data-name="Path 1429"
                        d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                        transform="translate(-270.155 -115.396)"
                        fill="#f29f05"
                      ></path>
                      <path
                        id="Path_1430"
                        data-name="Path 1430"
                        d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                        transform="translate(-264.176 -113.935)"
                        fill="#fff"
                      ></path>
                      <path
                        id="Path_1431"
                        data-name="Path 1431"
                        d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                        transform="translate(-266.247 -108.544)"
                        fill="#363636"
                      ></path>
                      <path
                        id="Path_1432"
                        data-name="Path 1432"
                        d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                        transform="translate(-264.027 -108.446)"
                        fill="#363636"
                      ></path>
                      <path
                        id="Path_1433"
                        data-name="Path 1433"
                        d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                        transform="translate(-271.815 -108.923)"
                        fill="#f29f05"
                      ></path>
                      <path
                        id="Path_1434"
                        data-name="Path 1434"
                        d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                        transform="translate(-264.154 -116.667)"
                        fill="#f29f05"
                      ></path>
                      <path
                        id="Path_1435"
                        data-name="Path 1435"
                        d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                        transform="translate(-270.84 -107.068)"
                        fill="#363636"
                      ></path>
                      <path
                        id="Path_1436"
                        data-name="Path 1436"
                        d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                        transform="translate(-269.379 -105.218)"
                        fill="#363636"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="menubot"
                    transform="translate(320 77)"
                    fill="#363636"
                    font-size="20"
                    font-family="Poppins"
                    font-weight="700"
                  >
                    <tspan x="0" y="0">
                      MENU
                    </tspan>
                    <tspan y="0" fill="#f29f05">
                      BOT
                    </tspan>
                  </text>
                </g>
              </svg>
            </div>
            <p className="text-gray-400">
              The Best Restaurants
              <br />
              In Your Home
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-orange-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          <FooterSection title="Sitemap" links={sitemap} />
          <FooterSection title="Information" links={information} />

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white mb-6">Contacts</h3>
            <ul className="space-y-3">
              {contacts.map((contact, index) => (
                <li key={index} className="text-gray-300">
                  {contact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 lg:px-20 text-center text-gray-400">
          © 2025 MENUBOT. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
