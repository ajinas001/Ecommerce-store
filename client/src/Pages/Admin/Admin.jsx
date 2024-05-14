import React, { useState } from 'react'
import Adminsidebar from './Adminsidebar'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown } from '../../Redux/SidebarSlice';
import Admincontent from './Admincontent';
import { Navigate, useNavigate } from 'react-router-dom';


function Admin() {


    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggleDropdown = () => {
    //   setDropdownOpen(!dropdownOpen);
    // };

    const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
    const [messagesDropdownVisible, setMessagesDropdownVisible] = useState(false);
    const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);

    const toggleNotificationDropdown = () => {
        setNotificationDropdownVisible(!notificationDropdownVisible);
        setMessagesDropdownVisible(false); // Close messages dropdown when opening notification dropdown
        setProfileDropdownVisible(false); // Close profile dropdown when opening notification dropdown
        setSearchDropdownVisible(false); // Close search dropdown when opening notification dropdown
    };

    const toggleMessagesDropdown = () => {
        setMessagesDropdownVisible(!messagesDropdownVisible);
        setNotificationDropdownVisible(false); // Close notification dropdown when opening messages dropdown
        setProfileDropdownVisible(false); // Close profile dropdown when opening messages dropdown
        setSearchDropdownVisible(false); // Close search dropdown when opening messages dropdown
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownVisible(!profileDropdownVisible);
        setNotificationDropdownVisible(false); // Close notification dropdown when opening profile dropdown
        setMessagesDropdownVisible(false); // Close messages dropdown when opening profile dropdown
        setSearchDropdownVisible(false); // Close search dropdown when opening profile dropdown
    };

    const toggleSearchDropdown = () => {
        setSearchDropdownVisible(!searchDropdownVisible);
        setNotificationDropdownVisible(false); // Close notification dropdown when opening search dropdown
        setMessagesDropdownVisible(false); // Close messages dropdown when opening search dropdown
        setProfileDropdownVisible(false); // Close profile dropdown when opening search dropdown
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
        console.log(isDropdownOpen);
    };

    const navigate = useNavigate()
    const handlelogout = ()=>{
        localStorage.clear()
        navigate('/')
        window.location.reload()
        
    }

    // const isDropdown = useSelector(state => state.sidebar.isDropdown);
    // const dispatch = useDispatch();

    // const handleToggleDropdown = () => {
    //     dispatch(toggleDropdown());
    // };
    return (
        <>
            <>
                {/* component */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
                <link
                    href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
                    rel="stylesheet"
                />
                <title>Admin Panel</title>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            '\n        @import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap\');\n\n/*\n! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  /* 1 */\n  border-width: 0;\n  /* 2 */\n  border-style: solid;\n  /* 2 */\n  border-color: #e5e7eb;\n  /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: \'\';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user\'s configured `sans` font-family by default.\n5. Use the user\'s configured `sans` font-feature-settings by default.\n6. Use the user\'s configured `sans` font-variation-settings by default.\n*/\n\nhtml {\n  line-height: 1.5;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -moz-tab-size: 4;\n  /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4;\n  /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n  /* 4 */\n  font-feature-settings: normal;\n  /* 5 */\n  font-variation-settings: normal;\n  /* 6 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0;\n  /* 1 */\n  line-height: inherit;\n  /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  border-top-width: 1px;\n  /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user\'s configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0;\n  /* 1 */\n  border-color: inherit;\n  /* 2 */\n  border-collapse: collapse;\n  /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  /* 1 */\n  font-feature-settings: inherit;\n  /* 1 */\n  font-variation-settings: inherit;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  font-weight: inherit;\n  /* 1 */\n  line-height: inherit;\n  /* 1 */\n  color: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  padding: 0;\n  /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type=\'button\'],\n[type=\'reset\'],\n[type=\'submit\'] {\n  -webkit-appearance: button;\n  /* 1 */\n  background-color: transparent;\n  /* 2 */\n  background-image: none;\n  /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type=\'search\'] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\n\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user\'s configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  /* 1 */\n  color: #9ca3af;\n  /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don\'t get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  /* 1 */\n  vertical-align: middle;\n  /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n\n[hidden] {\n  display: none;\n}\n\n*, ::before, ::after{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n.fixed{\n  position: fixed;\n}\n\n.absolute{\n  position: absolute;\n}\n\n.relative{\n  position: relative;\n}\n\n.sticky{\n  position: sticky;\n}\n\n.left-0{\n  left: 0px;\n}\n\n.left-4{\n  left: 1rem;\n}\n\n.top-0{\n  top: 0px;\n}\n\n.top-1\\/2{\n  top: 50%;\n}\n\n.z-30{\n  z-index: 30;\n}\n\n.z-40{\n  z-index: 40;\n}\n\n.z-50{\n  z-index: 50;\n}\n\n.my-2{\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n\n.-ml-3{\n  margin-left: -0.75rem;\n}\n\n.mb-0{\n  margin-bottom: 0px;\n}\n\n.mb-0\\.5{\n  margin-bottom: 0.125rem;\n}\n\n.mb-1{\n  margin-bottom: 0.25rem;\n}\n\n.mb-2{\n  margin-bottom: 0.5rem;\n}\n\n.mb-4{\n  margin-bottom: 1rem;\n}\n\n.mb-6{\n  margin-bottom: 1.5rem;\n}\n\n.ml-1{\n  margin-left: 0.25rem;\n}\n\n.ml-2{\n  margin-left: 0.5rem;\n}\n\n.ml-3{\n  margin-left: 0.75rem;\n}\n\n.ml-4{\n  margin-left: 1rem;\n}\n\n.ml-auto{\n  margin-left: auto;\n}\n\n.mr-1{\n  margin-right: 0.25rem;\n}\n\n.mr-2{\n  margin-right: 0.5rem;\n}\n\n.mr-3{\n  margin-right: 0.75rem;\n}\n\n.mr-4{\n  margin-right: 1rem;\n}\n\n.mt-2{\n  margin-top: 0.5rem;\n}\n\n.mt-3{\n  margin-top: 0.75rem;\n}\n\n.mt-4{\n  margin-top: 1rem;\n}\n\n.block{\n  display: block;\n}\n\n.inline-block{\n  display: inline-block;\n}\n\n.flex{\n  display: flex;\n}\n\n.table{\n  display: table;\n}\n\n.grid{\n  display: grid;\n}\n\n.hidden{\n  display: none;\n}\n\n.h-2{\n  height: 0.5rem;\n}\n\n.h-4{\n  height: 1rem;\n}\n\n.h-6{\n  height: 1.5rem;\n}\n\n.h-8{\n  height: 2rem;\n}\n\n.h-full{\n  height: 100%;\n}\n\n.max-h-64{\n  max-height: 16rem;\n}\n\n.min-h-screen{\n  min-height: 100vh;\n}\n\n.w-2{\n  width: 0.5rem;\n}\n\n.w-6{\n  width: 1.5rem;\n}\n\n.w-64{\n  width: 16rem;\n}\n\n.w-8{\n  width: 2rem;\n}\n\n.w-full{\n  width: 100%;\n}\n\n.min-w-\\[460px\\]{\n  min-width: 460px;\n}\n\n.min-w-\\[540px\\]{\n  min-width: 540px;\n}\n\n.max-w-\\[140px\\]{\n  max-width: 140px;\n}\n\n.max-w-xs{\n  max-width: 20rem;\n}\n\n.-translate-x-full{\n  --tw-translate-x: -100%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.-translate-y-1\\/2{\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.appearance-none{\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\n.grid-cols-1{\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n\n.items-start{\n  align-items: flex-start;\n}\n\n.items-center{\n  align-items: center;\n}\n\n.justify-center{\n  justify-content: center;\n}\n\n.justify-between{\n  justify-content: space-between;\n}\n\n.gap-4{\n  gap: 1rem;\n}\n\n.gap-6{\n  gap: 1.5rem;\n}\n\n.overflow-x-auto{\n  overflow-x: auto;\n}\n\n.overflow-y-auto{\n  overflow-y: auto;\n}\n\n.truncate{\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.rounded{\n  border-radius: 0.25rem;\n}\n\n.rounded-full{\n  border-radius: 9999px;\n}\n\n.rounded-md{\n  border-radius: 0.375rem;\n}\n\n.rounded-bl-md{\n  border-bottom-left-radius: 0.375rem;\n}\n\n.rounded-br-md{\n  border-bottom-right-radius: 0.375rem;\n}\n\n.rounded-tl-md{\n  border-top-left-radius: 0.375rem;\n}\n\n.rounded-tr-md{\n  border-top-right-radius: 0.375rem;\n}\n\n.border{\n  border-width: 1px;\n}\n\n.border-b{\n  border-bottom-width: 1px;\n}\n\n.border-b-2{\n  border-bottom-width: 2px;\n}\n\n.border-dashed{\n  border-style: dashed;\n}\n\n.border-gray-100{\n  --tw-border-opacity: 1;\n  border-color: rgb(243 244 246 / var(--tw-border-opacity));\n}\n\n.border-gray-200{\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity));\n}\n\n.border-b-gray-100{\n  --tw-border-opacity: 1;\n  border-bottom-color: rgb(243 244 246 / var(--tw-border-opacity));\n}\n\n.border-b-gray-50{\n  --tw-border-opacity: 1;\n  border-bottom-color: rgb(249 250 251 / var(--tw-border-opacity));\n}\n\n.border-b-gray-800{\n  --tw-border-opacity: 1;\n  border-bottom-color: rgb(31 41 55 / var(--tw-border-opacity));\n}\n\n.border-b-transparent{\n  border-bottom-color: transparent;\n}\n\n.bg-black\\/50{\n  background-color: rgb(0 0 0 / 0.5);\n}\n\n.bg-blue-500{\n  --tw-bg-opacity: 1;\n  background-color: rgb(59 130 246 / var(--tw-bg-opacity));\n}\n\n.bg-blue-500\\/10{\n  background-color: rgb(59 130 246 / 0.1);\n}\n\n.bg-emerald-500\\/10{\n  background-color: rgb(16 185 129 / 0.1);\n}\n\n.bg-gray-100{\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\n\n.bg-gray-50{\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.bg-gray-900{\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity));\n}\n\n.bg-rose-500\\/10{\n  background-color: rgb(244 63 94 / 0.1);\n}\n\n.bg-white{\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\n\n.bg-select-arrow{\n  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTExLjk5OTcgMTMuMTcxNEwxNi45NDk1IDguMjIxNjhMMTguMzYzNyA5LjYzNTg5TDExLjk5OTcgMTUuOTk5OUw1LjYzNTc0IDkuNjM1ODlMNy4wNDk5NiA4LjIyMTY4TDExLjk5OTcgMTMuMTcxNFoiIGZpbGw9InJnYmEoMTU2LDE2MywxNzUsMSkiPjwvcGF0aD48L3N2Zz4=");\n}\n\n.bg-\\[length\\:16px_16px\\]{\n  background-size: 16px 16px;\n}\n\n.bg-\\[right_16px_center\\]{\n  background-position: right 16px center;\n}\n\n.bg-no-repeat{\n  background-repeat: no-repeat;\n}\n\n.object-cover{\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.p-1{\n  padding: 0.25rem;\n}\n\n.p-4{\n  padding: 1rem;\n}\n\n.p-6{\n  padding: 1.5rem;\n}\n\n.px-4{\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-6{\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n\n.py-1{\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.py-1\\.5{\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n\n.py-2{\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.pb-1{\n  padding-bottom: 0.25rem;\n}\n\n.pb-4{\n  padding-bottom: 1rem;\n}\n\n.pl-10{\n  padding-left: 2.5rem;\n}\n\n.pl-4{\n  padding-left: 1rem;\n}\n\n.pl-7{\n  padding-left: 1.75rem;\n}\n\n.pr-10{\n  padding-right: 2.5rem;\n}\n\n.pr-4{\n  padding-right: 1rem;\n}\n\n.pt-4{\n  padding-top: 1rem;\n}\n\n.text-left{\n  text-align: left;\n}\n\n.align-top{\n  vertical-align: top;\n}\n\n.align-middle{\n  vertical-align: middle;\n}\n\n.font-inter{\n  font-family: \'Inter\', sans-serif;\n}\n\n.text-2xl{\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n\n.text-\\[11px\\]{\n  font-size: 11px;\n}\n\n.text-\\[12px\\]{\n  font-size: 12px;\n}\n\n.text-\\[13px\\]{\n  font-size: 13px;\n}\n\n.text-base{\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n\n.text-lg{\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.text-sm{\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-xl{\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n\n.font-bold{\n  font-weight: 700;\n}\n\n.font-medium{\n  font-weight: 500;\n}\n\n.font-normal{\n  font-weight: 400;\n}\n\n.font-semibold{\n  font-weight: 600;\n}\n\n.uppercase{\n  text-transform: uppercase;\n}\n\n.leading-none{\n  line-height: 1;\n}\n\n.tracking-wide{\n  letter-spacing: 0.025em;\n}\n\n.text-blue-500{\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.text-emerald-500{\n  --tw-text-opacity: 1;\n  color: rgb(16 185 129 / var(--tw-text-opacity));\n}\n\n.text-gray-300{\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity));\n}\n\n.text-gray-400{\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity));\n}\n\n.text-gray-600{\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n}\n\n.text-gray-800{\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity));\n}\n\n.text-rose-500{\n  --tw-text-opacity: 1;\n  color: rgb(244 63 94 / var(--tw-text-opacity));\n}\n\n.text-white{\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.shadow-md{\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-black\\/10{\n  --tw-shadow-color: rgb(0 0 0 / 0.1);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n\n.shadow-black\\/5{\n  --tw-shadow-color: rgb(0 0 0 / 0.05);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n\n.outline-none{\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.transition-all{\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.transition-transform{\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.notification-tab > .active{\n  --tw-border-opacity: 1;\n  border-bottom-color: rgb(59 130 246 / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.notification-tab > .active:hover{\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.order-tab > .active{\n  --tw-bg-opacity: 1;\n  background-color: rgb(59 130 246 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.order-tab > .active:hover{\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n@media (min-width: 768px){\n  .main.active{\n    margin-left: 0px;\n    width: 100%;\n  }\n}\n\n.before\\:mr-3::before{\n  content: var(--tw-content);\n  margin-right: 0.75rem;\n}\n\n.before\\:h-1::before{\n  content: var(--tw-content);\n  height: 0.25rem;\n}\n\n.before\\:w-1::before{\n  content: var(--tw-content);\n  width: 0.25rem;\n}\n\n.before\\:rounded-full::before{\n  content: var(--tw-content);\n  border-radius: 9999px;\n}\n\n.before\\:bg-gray-300::before{\n  content: var(--tw-content);\n  --tw-bg-opacity: 1;\n  background-color: rgb(209 213 219 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-50:hover{\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.hover\\:bg-gray-950:hover{\n  --tw-bg-opacity: 1;\n  background-color: rgb(3 7 18 / var(--tw-bg-opacity));\n}\n\n.hover\\:text-blue-500:hover{\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.hover\\:text-blue-600:hover{\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-100:hover{\n  --tw-text-opacity: 1;\n  color: rgb(243 244 246 / var(--tw-text-opacity));\n}\n\n.hover\\:text-gray-600:hover{\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n}\n\n.focus\\:border-blue-500:focus{\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity));\n}\n\n.group:hover .group-hover\\:text-blue-500{\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\n\n.group.selected .group-\\[\\.selected\\]\\:block{\n  display: block;\n}\n\n.group.selected .group-\\[\\.selected\\]\\:rotate-90{\n  --tw-rotate: 90deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.group.active .group-\\[\\.active\\]\\:bg-gray-800{\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity));\n}\n\n.group.selected .group-\\[\\.selected\\]\\:bg-gray-950{\n  --tw-bg-opacity: 1;\n  background-color: rgb(3 7 18 / var(--tw-bg-opacity));\n}\n\n.group.active .group-\\[\\.active\\]\\:text-white{\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n\n.group.selected .group-\\[\\.selected\\]\\:text-gray-100{\n  --tw-text-opacity: 1;\n  color: rgb(243 244 246 / var(--tw-text-opacity));\n}\n\n@media (min-width: 768px){\n  .md\\:ml-64{\n    margin-left: 16rem;\n  }\n\n  .md\\:hidden{\n    display: none;\n  }\n\n  .md\\:w-\\[calc\\(100\\%-256px\\)\\]{\n    width: calc(100% - 256px);\n  }\n\n  .md\\:grid-cols-2{\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (min-width: 1024px){\n  .lg\\:col-span-2{\n    grid-column: span 2 / span 2;\n  }\n\n  .lg\\:grid-cols-2{\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .lg\\:grid-cols-3{\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n    '
                    }}
                />

                {/*sidenav */}
                {/* <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform sm:w-10">
    <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
      <h2 className="font-bold text-2xl">
        LOREM{" "}
        <span className="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
      </h2>
    </a>
    <ul className="mt-4">
      <span className="text-gray-400 font-bold">ADMIN</span>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i className="ri-home-2-line mr-3 text-lg" />
          <span className="text-sm">Dashboard</span>
        </a>
      </li>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i className="bx bx-user mr-3 text-lg" />
          <span className="text-sm">Users</span>
          <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
        </a>
        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
          <li className="mb-4">
            <a
              href=""
              className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
            >
              All
            </a>
          </li>
          <li className="mb-4">
            <a
              href=""
              className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
            >
              Roles
            </a>
          </li>
        </ul>
      </li>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i className="bx bx-list-ul mr-3 text-lg" />
          <span className="text-sm">Activities</span>
        </a>
      </li>
      <span className="text-gray-400 font-bold">BLOG</span>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i className="bx bxl-blogger mr-3 text-lg" />
          <span className="text-sm">Post</span>
          <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
        </a>
        <ul className="pl-7 mt-2 hidden group-[.selected]:block">
          <li className="mb-4">
            <a
              href=""
              className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
            >
              All
            </a>
          </li>
          <li className="mb-4">
            <a
              href=""
              className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
            >
              Categories
            </a>
          </li>
        </ul>
      </li>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i className="bx bx-archive mr-3 text-lg" />
          <span className="text-sm">Archive</span>
        </a>
      </li>
      <span className="text-gray-400 font-bold">PERSONAL</span>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i className="bx bx-bell mr-3 text-lg" />
          <span className="text-sm">Notifications</span>
          <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">
            5
          </span>
        </a>
      </li>
      <li className="mb-1 group">
        <a
          href=""
          className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i className="bx bx-envelope mr-3 text-lg" />
          <span className="text-sm">Messages</span>
          <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
            2 New
          </span>
        </a>
      </li>
    </ul>
  </div>
  <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" /> */}
                {/* end sidenav */}




                {isDropdownOpen && (<>
                    <Adminsidebar />
                    <main className="w-full w-[calc(100%-256px)] ml-64 md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
                        {/* navbar */}
                        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                            <button
                                type="button"
                                className="text-lg text-gray-900 font-semibold sidebar-toggle"
                                onClick={toggleDropdown}
                            >
                                <i className="ri-menu-line" />
                            </button>
                            <ul className="ml-auto flex items-center">
                                <li className="mr-1 dropdown">
                                    <button
                                        type="button"
                                        onClick={toggleSearchDropdown}
                                        className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            className="hover:bg-gray-100 rounded-full"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "gray", transform: "", msfilter: "" }}
                                        >
                                            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                                        </svg>
                                    </button>
                                    <div className={`dropdown-menu shadow-md shadow-black/5 z-30 ${searchDropdownVisible ? 'block' : 'hidden'} max-w-xs w-48 bg-white rounded-md border border-gray-100 absolute top-full mt-2 left-70%`}>

                                        <div className="dropdown-menu shadow-md shadow-black/5 z-30  max-w-xs w-full bg-white rounded-md border border-gray-100">
                                            <form action="" className="p-4 border-b border-b-gray-100">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                                                        placeholder="Search..."
                                                    />
                                                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900" />
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </li>
                                <li className="dropdown">
                                    <button
                                        type="button"
                                        className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            className="hover:bg-gray-100 rounded-full"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "gray", transform: "", msfilter: "" }}
                                        >
                                            <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                                        </svg>
                                    </button>
                                    <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                                        <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                                            <button
                                                type="button"
                                                data-tab="notification"
                                                data-tab-page="notifications"
                                                className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
                                            >
                                                Notifications
                                            </button>
                                            <button
                                                type="button"
                                                data-tab="notification"
                                                data-tab-page="messages"
                                                className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
                                            >
                                                Messages
                                            </button>
                                        </div>
                                        <div className="my-2">
                                            <ul
                                                className="max-h-64 overflow-y-auto"
                                                data-tab-for="notification"
                                                data-page="notifications"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                New order
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                from a user
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                New order
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                from a user
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                New order
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                from a user
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                New order
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                from a user
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                New order
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                from a user
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul
                                                className="max-h-64 overflow-y-auto hidden"
                                                data-tab-for="notification"
                                                data-page="messages"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                John Doe
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                Hello there!
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                John Doe
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                Hello there!
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                John Doe
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                Hello there!
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                John Doe
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                Hello there!
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                                    >
                                                        <img
                                                            src="https://placehold.co/32x32"
                                                            alt=""
                                                            className="w-8 h-8 rounded block object-cover align-middle"
                                                        />
                                                        <div className="ml-2">
                                                            <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                                John Doe
                                                            </div>
                                                            <div className="text-[11px] text-gray-400">
                                                                Hello there!
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li className="ml-3 dropdown relative">
                                    <button
                                        type="button"
                                        className="dropdown-toggle flex items-center"
                                        onClick={toggleProfileDropdown}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 relative">
                                            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                                    alt=""
                                                />
                                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                                            </div>
                                        </div>
                                        <div className="p-2 md:block text-left">
                                            <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
                                            <p className="text-xs text-gray-500">Administrator</p>
                                        </div>
                                    </button>
                                    <ul className={`dropdown-menu shadow-md shadow-black/5 z-30 ${profileDropdownVisible ? 'block' : 'hidden'} py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] absolute top-full mt-2 left-0`}>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <form >
                                                <a
                                                    role="menuitem"
                                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                                    onClick={(e) => { e.preventDefault(),handlelogout() }}
                                                >
                                                    Log Out
                                                </a>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* end navbar */}
                        <Admincontent />

                    </main>
                </>)}

                {!isDropdownOpen && (<>

                    <main className="w-full  bg-gray-200 min-h-screen transition-all main">
                        {/* navbar */}
                        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                            <button
                                type="button"
                                className="text-lg text-gray-900 font-semibold sidebar-toggle"
                                onClick={toggleDropdown}
                            >
                                <i className="ri-menu-line" />
                            </button>
                            <ul className="ml-auto flex items-center">
                                <li className="mr-1 dropdown relative">
                                    <button
                                        type="button"
                                        className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
                                        onClick={toggleSearchDropdown}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            className="hover:bg-gray-100 rounded-full"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "gray", transform: "", msfilter: "" }}
                                        >
                                            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                                        </svg>
                                    </button>
                                    <div className={`dropdown-menu shadow-md shadow-black/5 z-30 ${searchDropdownVisible ? 'block' : 'hidden'} max-w-xs w-48 bg-white rounded-md border border-gray-100 absolute top-full mt-2 left-0`}>

                                        <div className="dropdown-menu shadow-md shadow-black/5 z-30  max-w-xs w-full bg-white rounded-md border border-gray-100">
                                            <form action="" className="p-4 border-b border-b-gray-100">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                                                        placeholder="Search..."
                                                    />
                                                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900" />
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </li>
                                <li className="dropdown relative">
                                    <button
                                        type="button"
                                        className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
                                        onClick={toggleMessagesDropdown}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            className="hover:bg-gray-100 rounded-full"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "gray", transform: "", msfilter: "" }}
                                        >
                                            <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                                        </svg>
                                    </button>


                                </li>


                                <li className="ml-3 dropdown relative">
                                    <button
                                        type="button"
                                        className="dropdown-toggle flex items-center"
                                        onClick={toggleProfileDropdown}
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 relative">
                                            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                                    alt=""
                                                />
                                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                                            </div>
                                        </div>
                                        <div className="p-2 md:block text-left">
                                            <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
                                            <p className="text-xs text-gray-500">Administrator</p>
                                        </div>
                                    </button>
                                    <ul className={`dropdown-menu shadow-md shadow-black/5 z-30 ${profileDropdownVisible ? 'block' : 'hidden'} py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] absolute top-full mt-2 left-0`}>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <form>
                                                <a
                                                    role="menuitem"
                                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                                    onClick={(e) => { e.preventDefault() ,handlelogout() }}
                                                >
                                                    Log Out
                                                </a>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                                {/* <li className="dropdown ml-3 relative">
                                    <button
                                        type="button"
                                        className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
                                        onClick={toggleSearchDropdown}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            className="hover:bg-gray-100 rounded-full"
                                            viewBox="0 0 24 24"
                                            style={{ fill: "gray", transform: "", msfilter: "" }}
                                        >
                                            <path d="M19 5v2h-.586l-2.707 2.707-1.414-1.414L16.586 6H19zm1.707 3.707L22.414 9l-4.707 4.707 1.414 1.414L24.121 10l-3.414-3.414-1.414 1.414zM17 10v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4V3H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v2h2a3 3 0 0 0 3-3V10h-2zM9 2v2H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4v2H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4zm9 16v-2h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2V6h2a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-2z" />
                                        </svg>
                                    </button>
                                    <div className={`dropdown-menu shadow-md shadow-black/5 z-30 ${searchDropdownVisible ? 'block' : 'hidden'} max-w-xs w-full bg-white rounded-md border border-gray-100 absolute top-full mt-2 left-0`}>
                                        <form action="" className="p-4 border-b border-b-gray-100">
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                                                    placeholder="Search..."
                                                />
                                                <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900" />
                                            </div>
                                        </form>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                        {/* end navbar */}
                        <Admincontent />

                    </main>
                </>)}

            </>

        </>
    )
}

export default Admin
