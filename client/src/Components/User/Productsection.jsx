import { Fragment, useState, useEffect } from 'react'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild, } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MenuIcon, ListBulletIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Navbar from '../Navbar'
import Productsectioncontent from './Productsectioncontent'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { HomeIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react'
import Aos from 'aos'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setInCart, fetchCart } from '../../Redux/CartSlice';


const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    // {
    //     id: 'color',
    //     name: 'Color',
    //     options: [
    //         { value: 'white', label: 'White', checked: false },
    //         { value: 'beige', label: 'Beige', checked: false },
    //         { value: 'blue', label: 'Blue', checked: true },
    //         { value: 'brown', label: 'Brown', checked: false },
    //         { value: 'green', label: 'Green', checked: false },
    //         { value: 'purple', label: 'Purple', checked: false },
    //     ],
    // },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'Men', label: 'Men', checked: false },
            { value: 'Women', label: 'Women', checked: false },
            { value: 'Bag', label: 'Bag', checked: false },
            { value: "Men's Shoe", label: "Men's Shoe", checked: false },
            { value: "Women's Shoe", label: "Women's Shoe", checked: false },
            // { value: 'accessories', checked: false },
        ],
    },
    // {
    //     id: 'category',
    //     name: 'Category',
    //     options: [
    //         { value: 'new-arrivals', label: 'New Arrivals', checked: false },
    //         { value: 'sale', label: 'Sale', checked: false },
    //         { value: 'travel', label: 'Travel', checked: false },
    //         { value: 'organization', label: 'Organization', checked: false },
    //         // { value: 'accessories', checked: false },
    //     ],
    // },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: 'S', label: 'S', checked: false },
            { value: 'M', label: 'M', checked: false },
            { value: 'L', label: 'L', checked: false },
            { value: 'XL', label: 'XL', checked: false },
            // { value: '20l', label: '20L', checked: false },
            // { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Productsection() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setdata] = useState([])
    const [empty, setempty] = useState(false)
    const [query, setQuery] = useState('');
    const [result, setresult] = useState([])
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop();
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || 'all');




    const { category } = useParams();

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])
    // console.log(query, "query");
    const temp = (query.split(','));
    // console.log(temp.length, "querylength");

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4005/user/search?q=${query}`); // Send search query to backend
            setresult(response.data); // Update results state with search results
            console.log(response, "search");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:4005/user/viewsectionallproduct').then((res) => {
            setdata(res.data.data)
        }).catch((err) => {
            console.log(err);
            setempty(true)
        })
    }, [])

    const capitalizedData = data.map(item => {
        let category = item.Category;
        return category.charAt(0).toUpperCase() + category.slice(1);
    });
    const sizedata = data.map(item => {
        let sizes = item.Size.split(',')
        return sizes
    })
    const subcat = [...new Set(capitalizedData)];
    const size = [...new Set(sizedata)]
    // console.log(subcat, "subcat without duplicates");

    useEffect(() => {
        if (!category || !subcat.includes(category)) {
            setSelectedCategory('all');
        } else {
            setSelectedCategory(category);
        }
    }, [category, subcat]);



    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState("All categories");

    const toggleCategoriesDropdown = () => {
        setShowCategoriesDropdown(!showCategoriesDropdown);
    }

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
        setShowCategoriesDropdown(false);
    }

    const [loading, setLoading] = useState(true); // Add loading state
    const [product, setProduct] = useState([]);
    // const [incart, setIncart] = useState({});
    const userid = localStorage.getItem('id');
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.items);
    const incart = useSelector((state) => state.cart.incart);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                console.log(category);
                let res;
                if (category) {
                    console.log("category wise");
                    res = await axios.get(`http://localhost:4005/user/viewsectionproduct/${category}`);
                } else {
                    console.log("All category");
                    res = await axios.get('http://localhost:4005/user/viewsectionallproduct');
                }
                console.log('Products response:', res);
                setProduct(res.data.data);
                setLoading(false); // Update loading state when data is fetched
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false); // Update loading state even if there's an error
            }
        };
        dispatch(fetchCart(userid));
        fetchProductData();
    }, [, dispatch, category]);


    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const offerprice = (data) => {
        if (!data || !data.Price) {
            return 0;
        }

        const Price = parseInt(data.Price);
        const Discount = parseInt(data.Discount || 0);

        if (isNaN(Price)) {
            return 0;
        }

        if (isNaN(Discount) || Discount === 0) {
            return Price;
        }

        const discountedPrice = Price - (Price * Discount / 100);
        return discountedPrice.toFixed(0);
    };

    const handleAddToCart = (productId) => {
        dispatch(addToCart({ userid, productId, quantity: 1 }))
            .then(() => {
                dispatch(setInCart({ productId, isInCart: true }));
                toast.success('Added to cart');
            })
            .catch((error) => {
                console.error('Failed to add to cart:', error);
                toast.error('Failed to add to cart');
            });
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ userid, productId }))
            .then(() => {
                dispatch(setInCart({ productId, isInCart: false }));
                toast.success('Removed from cart');
            })
            .catch((error) => {
                console.error('Failed to remove from cart:', error);
                toast.error('Failed to remove from cart');
            });
    };

    const [selectedValues, setSelectedValues] = useState([]);

    // Function to handle checkbox clicks and update selected values
    const handleCheckboxChange = (value) => {
        // Check if the value is already selected
        const selectedIndex = selectedValues.indexOf(value);
        if (selectedIndex === -1) {
            // If not selected, add it to the selected values and update the query state
            const updatedValues = [...selectedValues, value];
            setSelectedValues(updatedValues);
            setQuery(updatedValues.join(',')); // Set the query state with selected values separated by comma
        } else {
            // If already selected, remove it from the selected values
            const updatedValues = [...selectedValues];
            updatedValues.splice(selectedIndex, 1);
            setSelectedValues(updatedValues);
            // Update the query state with remaining selected values or set it to empty if no value is selected
            setQuery(updatedValues.length > 0 ? updatedValues.join(',') : '');
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition show={mobileFiltersOpen}>
                        <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <TransitionChild
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </TransitionChild>

                            <div className="fixed inset-0 z-40 flex">
                                <TransitionChild
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            <h3 className="sr-only">Categories</h3>
                                            <Link to={'/productsection'} onClick={() => setSelectedCategory('all')}>
                                                <h3 className={` font-medium rounded-lg m-4  ps-4 p-2 ${selectedCategory === 'all' ? 'border box-border bg-gray-900 text-white' : 'hover:bg-gray-200'}`}>All Categories</h3>
                                            </Link>
                                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                                {subcat.map((category) => (
                                                    <li key={category}
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={`cursor-pointer rounded-lg m-4 ps-4 p-2 ${selectedCategory === category ? 'border box-border bg-black text-white' : 'hover:bg-gray-200'}`}>
                                                        <Link to={`/productsection/${category}`} className="block">
                                                            {category}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>

                                            {filters.map((section) => (
                                                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6" >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                        ) : (
                                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                        )}
                                                                    </span>
                                                                </DisclosureButton>
                                                            </h3>
                                                            <DisclosurePanel className="pt-6">
                                                                <div className="space-y-6">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div key={option.value} className="flex items-center">
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={option.value}
                                                                                type="checkbox"
                                                                                defaultChecked={option.checked}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </DisclosurePanel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </form>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </Dialog>
                    </Transition>

                    <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-24">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-20">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 hidden lg:block">Our Products</h1>

                            <div className="flex justify-center items-center px-4 lg:px-20">
                                <div className="flex flex-col lg:flex-row items-center">
                                    <div className="flex items-center p-2 px-4 space-x-6 bg-white rounded-xl hover:shadow-xl transform hover:scale-105 transition duration-500">
                                        <div className="flex bg-gray-100 p-2 w-full lg:w-60 space-x-4 rounded-lg items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input className="bg-gray-100 outline-none w-full" type="text" placeholder="Search product name or keyword..." onChange={(e) => { setQuery(e.target.value) }} />
                                        </div>
                                        <div>
                                            <div className="relative lg:block hidden sm:hidden md:hidden">
                                                <div className="flex items-center py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer" onClick={toggleCategoriesDropdown}>
                                                    { }
                                                    <span>{category == null || undefined ? "All category" : category}</span>
                                                    {/* <ChevronDownIcon className="h-6 w-6 ml-1" /> */}
                                                </div>
                                                {/* {showCategoriesDropdown && (
                                                    <div style={{ position: 'absolute', top: '100%', left: '0', marginTop: '0.25rem', width: '100%', backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 70 }}>
                                                        <ul style={{ padding: '0.25rem 0' }}>
                                                            {subcat.map((item, key) => (
                                                                <li
                                                                    key={key}
                                                                    style={{ cursor: 'pointer', padding: '0.5rem 1rem', hover: { backgroundColor: '#f5f5f5' } }}
                                                                    onClick={() => handleCategorySelection(item)}
                                                                >
                                                                    {item}
                                                                </li>
                                                            ))}
                                                            <li
                                                                style={{ cursor: 'pointer', padding: '0.5rem 1rem', hover: { backgroundColor: '#f5f5f5' } }}
                                                                onClick={() => handleCategorySelection("All categories")}
                                                            >
                                                                All categories
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )} */}
                                            </div>

                                        </div>
                                        <div className="bg-gray-800 py-1 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-300 cursor-pointer">
                                            <span onClick={handleSearch}>Search</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </MenuButton>
                                    </div>

                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <MenuItem key={option.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={option.href}
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </MenuItems>
                                    </Transition>
                                </Menu>

                                <button type="button" className="hidden sm:block -m-2 ml-5 p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                </button>

                                <button
                                    type="button"
                                    className="-m-2 ml-4 mr-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <Link to={'/productsection'} onClick={() => setSelectedCategory('all')}>
                                        <h3 className={`mb-4 font-medium rounded-lg ps-4 p-2 ${selectedCategory === 'all' ? 'border box-border bg-gray-900 text-white' : 'hover:bg-gray-200'}`}>All Categories</h3>
                                    </Link>
                                    <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                        {subcat.map((category) => (
                                            <li key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`cursor-pointer rounded-lg ps-4 p-2 ${selectedCategory === category ? 'border box-border bg-black text-white' : 'hover:bg-gray-200'}`}>
                                                <Link to={`/productsection/${category}`} className="block">
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" defaultOpen={true}>
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        value={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        onChange={() => handleCheckboxChange(option.value)}
                                                                        // onChange={(e) => setQuery(e.target.value)} // Update the state when the input value changes
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DisclosurePanel>

                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3">
                                    {loading ? ( // Display loading indicator if loading is true
                                        <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                                            <span className='sr-only'>Loading...</span>
                                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                                        </div>
                                    ) : product.length > 0 ? (
                                        <>
                                            {/* Render products */}
                                            <section
                                                id="Projects"
                                                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-14 gap-x-14"
                                                data-aos="zoom-in"
                                            >
                                                {product && product.filter((item) => {
                                                    // Split and transform each part of the query to capitalize the first letter
                                                    const transformedQueries = query.split(',').map(term => term.trim().charAt(0).toUpperCase() + term.trim().slice(1));

                                                    // If the query is empty, return all items
                                                    if (query.trim() === '') {
                                                        return true; // Return all items
                                                    }

                                                    // Filter by category, name, or size
                                                    return transformedQueries.some(transformedQuery =>
                                                        item.Category.includes(transformedQuery) ||
                                                        item.Name.includes(transformedQuery) ||
                                                        item.Size.split(',').includes(transformedQuery)
                                                    );
                                                }).length === 0 ? (
                                                    <div className="flex flex-col justify-start items-center h-screen w-screen md:ms-[700px] lg:ms-[700px]">
                                                        <div className="mt-20">
                                                            <img src="../images/empty2.png" alt="No products found" className="w-72 h-auto mb-4" />
                                                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! No products found</h2>
                                                            <p className="text-lg text-gray-600">We couldn't find any products matching.</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    product.filter((item) => {
                                                        // Split and transform each part of the query to capitalize the first letter
                                                        const transformedQueries = query.split(',').map(term => term.trim().charAt(0).toUpperCase() + term.trim().slice(1));
                                                        // console.log(transformedQueries, "sort");

                                                        // If the query is empty, return all items
                                                        if (query.trim() === '') {
                                                            return true; // Return all items
                                                        }

                                                        // Filter by category, name, or size
                                                        return transformedQueries.some(transformedQuery =>
                                                            item.Category.includes(transformedQuery) ||
                                                            item.Name.includes(transformedQuery) ||
                                                            item.Size.split(',').includes(transformedQuery)
                                                        );
                                                    }).map((data) => (
                                                        <div key={data._id} className="w-60 bg-white -md rounded-xl duration-500 hover:scale-105">
                                                            <a href={`/viewproductdetails/${data._id}`} className="relative h-64 w-60 block">
                                                                <img
                                                                    src={`/uploadedimages/${data.images[0]}`}
                                                                    className="absolute h-64 w-72 top-0 left-0 object-cover rounded-t-xl transition-opacity duration-300 opacity-100 hover:opacity-0"
                                                                />
                                                                <img
                                                                    src={`/uploadedimages/${data.images[1]}`}
                                                                    className="absolute h-64 w-72 top-0 left-0 object-cover rounded-t-xl transition-opacity duration-300 opacity-0 hover:opacity-100"
                                                                />
                                                                {data.Discount && data.Discount > 0 ? <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                                                    {data.Discount}% OFF
                                                                </span> : null}
                                                            </a>       <div className="px-4 py-3 w-60">
                                                                <span className="text-gray-400 mr-3 uppercase text-xs">{data.Category}</span>
                                                                <p className="text-lg font-semibold text-black  block capitalize truncate w-44">
                                                                    {data.Name}
                                                                </p>
                                                                <div className="flex items-center">
                                                                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                                                                        {offerprice(data)}
                                                                    </p>
                                                                    {data.Discount && data.Discount > 0 ? <p className="text-sm  text-black cursor-auto ps-2 line-through my-3">
                                                                        {data.Price}
                                                                    </p> : null}

                                                                    {incart[data._id] ? (
                                                                        <button className="ml-auto" onClick={() => handleRemoveFromCart(data._id)}>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={20}
                                                                                height={20}
                                                                                fill="currentColor"
                                                                                className="bi bi-bag-x"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M8 7a.5.5 0 0 1 .5.5v1.293l1.354-1.353a.5.5 0 1 1 .708.707L9.207 9.5l1.354 1.354a.5.5 0 1 1-.707.707L8.5 10.207 7.146 11.56a.5.5 0 1 1-.707-.707L7.793 9.5 6.44 8.146a.5.5 0 1 1 .707-.707L8 8.793V7.5A.5.5 0 0 1 8 7z"
                                                                                />
                                                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5
zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                                            </svg>
                                                                        </button>
                                                                    ) : (
                                                                        <button className="ml-auto" onClick={() => handleAddToCart(data._id)}>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={20}
                                                                                height={20}
                                                                                fill="currentColor"
                                                                                className="bi bi-bag-plus"
                                                                                viewBox="0 0 16 16"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                                                                />
                                                                                <path
                                                                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )))}
                                            </section>
                                        </>
                                    ) : (
                                        // Render a message or design when no products are available
                                        <div className="flex flex-col justify-start items-center h-screen">
                                            <div className="mt-20">
                                                <img src="../images/empty2.png" alt="No products found" className="w-72 h-auto mb-4" />
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! No products found</h2>
                                                <p className="text-lg text-gray-600">We couldn't find any products matching.</p>
                                            </div>
                                        </div>

                                    )}
                                </div>

                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
