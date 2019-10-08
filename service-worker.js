/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/tr.vuejs.org/2014/03/22/vuejs-010-release/index.html","3b088cafd651334c217ba4be61953a26"],["/tr.vuejs.org/2014/07/29/vue-next/index.html","5b849763a4cb12bfdd9067c06ed986ff"],["/tr.vuejs.org/2014/11/09/vue-011-release/index.html","9dfbd931da82dde1b46c9e68eb274520"],["/tr.vuejs.org/2014/12/08/011-component/index.html","8ac500b2a0d648fdd6524b924baea8f7"],["/tr.vuejs.org/2015/06/11/012-release/index.html","41a975bb3bda74b4b172a329e3fb0c2e"],["/tr.vuejs.org/2015/10/26/1.0.0-release/index.html","e1ce2adf99b3aebfe5b68261a6058296"],["/tr.vuejs.org/2015/10/28/why-no-template-url/index.html","9653f3864560267964c733cabd74ecfc"],["/tr.vuejs.org/2015/12/28/vue-cli/index.html","20c635b17691e7c97f5ca7d8dfd0e783"],["/tr.vuejs.org/2016/02/06/common-gotchas/index.html","bf927587e684e0756473d1b4715b5007"],["/tr.vuejs.org/2016/03/14/march-update/index.html","2b932b2750631ce41ad07756cc17d6a7"],["/tr.vuejs.org/2016/04/27/announcing-2.0/index.html","baabdd19c24e94b6a040241f71a75c29"],["/tr.vuejs.org/api/index.html","0bb05d5421304fe3c085e0c83b88f706"],["/tr.vuejs.org/archives/2014/03/index.html","36446d623ab9c55b137a3975013c72de"],["/tr.vuejs.org/archives/2014/07/index.html","52bfbad07c347a5b041d29b8265f0496"],["/tr.vuejs.org/archives/2014/11/index.html","beef8aa761de836ea685a186a5e76b36"],["/tr.vuejs.org/archives/2014/12/index.html","eacd155d24f47abcc4066493b6fb53da"],["/tr.vuejs.org/archives/2014/index.html","81e70f05813816078dc746265f82a6be"],["/tr.vuejs.org/archives/2015/06/index.html","b822af030e4b6ab2f60438330ce45079"],["/tr.vuejs.org/archives/2015/10/index.html","15a8b6504cc08c2bb214c8c54f6af6e9"],["/tr.vuejs.org/archives/2015/12/index.html","8ce4f54d0d95d52467bdb7b35ecd0f18"],["/tr.vuejs.org/archives/2015/index.html","db5207259f0436caf69859608e4dfebe"],["/tr.vuejs.org/archives/2016/02/index.html","377ce0a2e355b1892682b98ef1702724"],["/tr.vuejs.org/archives/2016/03/index.html","7a5d4918f0e67985562d89294e46eb53"],["/tr.vuejs.org/archives/2016/04/index.html","9e0146d3e63b896c4ed5f8c3f4db3b80"],["/tr.vuejs.org/archives/2016/index.html","dcfa230460e11126f756133db2934237"],["/tr.vuejs.org/archives/index.html","8b7ffae9c75f4be8b82c7af4758f0f2a"],["/tr.vuejs.org/archives/page/2/index.html","0e4d30656a35037a6e4687467bf50066"],["/tr.vuejs.org/atom.xml","906bd70f3a467f9645943b34e013ad35"],["/tr.vuejs.org/browserconfig.xml","a9461fcba28550a616a19a0aee8450ac"],["/tr.vuejs.org/coc/index.html","68878360a5742bda818bf09540400fe2"],["/tr.vuejs.org/css/benchmark.css","b083e0006589a5ba88a250eb8ee12cc5"],["/tr.vuejs.org/css/index.css","b1f0accaa6b63227ca5669c7c4dd3a76"],["/tr.vuejs.org/css/page.css","b7e151e75ee7abb17411554477aa5c30"],["/tr.vuejs.org/css/search.css","98bc5fed33d9deaea04ed36de435afd7"],["/tr.vuejs.org/examples/commits.html","68409935cd1f074b0a3401169edea473"],["/tr.vuejs.org/examples/elastic-header.html","78f1ac4fe15f69be878ae3cf210d342c"],["/tr.vuejs.org/examples/firebase.html","7ef1da1a28ca14785457c05278bcfa0e"],["/tr.vuejs.org/examples/grid-component.html","71077b3d394897e48e67c243573767e9"],["/tr.vuejs.org/examples/hackernews.html","325a5b5c7c02e5f024321142d52f3750"],["/tr.vuejs.org/examples/index.html","0409ce6a77721719d5820905da73b042"],["/tr.vuejs.org/examples/modal.html","2ff1099ea0ccbc13faebd5a6b01db330"],["/tr.vuejs.org/examples/select2.html","7de2f111dd9fbd6cbdf678fabc01ee6a"],["/tr.vuejs.org/examples/svg.html","805b84a75ce150292fabf9e9d4a31b57"],["/tr.vuejs.org/examples/todomvc.html","78e0373c01240354b0ce4b9959d3ce91"],["/tr.vuejs.org/examples/tree-view.html","12385abe8e90b19480e34f28a4336fc0"],["/tr.vuejs.org/guide/class-and-style.html","74b4dab38809210fa504072319a03dfb"],["/tr.vuejs.org/guide/comparison.html","ee5a9c8f96fd35529675dea573cc9e23"],["/tr.vuejs.org/guide/components.html","3afc7f6e687b5de5a0794287ccdd03a6"],["/tr.vuejs.org/guide/computed.html","8e5f5c5170c85bf53f2af5702957da4e"],["/tr.vuejs.org/guide/conditional.html","c33b0d80188bf894c468b1bd11a43247"],["/tr.vuejs.org/guide/custom-directive.html","7d589ca294e6057ecbcd8873c5eb8c7d"],["/tr.vuejs.org/guide/deployment.html","5142b9bbef2def27de0dc89eac38ffab"],["/tr.vuejs.org/guide/events.html","e39e966c14d56442eff0fc745b19ce56"],["/tr.vuejs.org/guide/forms.html","e29ee6e62184c0054c9190d7c81f04ca"],["/tr.vuejs.org/guide/index.html","5fed3e642df080440f3f40895ac8d2b9"],["/tr.vuejs.org/guide/installation.html","af1beab40a2b4a338d1730608f38d9fa"],["/tr.vuejs.org/guide/instance.html","cb24921909393c20b76a34fbf0eaad7f"],["/tr.vuejs.org/guide/join.html","b669073b97519f8c572a1b341c63b798"],["/tr.vuejs.org/guide/list.html","fdd0eabd2d0744fb7ffb1b4a5c8a0cf5"],["/tr.vuejs.org/guide/migration-vue-router.html","e5c17fa0cb79e845b759cf716c3577a2"],["/tr.vuejs.org/guide/migration-vuex.html","5e250dfc98db20c852fba50572f398e0"],["/tr.vuejs.org/guide/migration.html","f4aded0382c8266d859a8b85b9594a23"],["/tr.vuejs.org/guide/mixins.html","4a62329709ea89855360dfc31f30b759"],["/tr.vuejs.org/guide/plugins.html","626aea93ffa1aad5f45054bdce9d74d7"],["/tr.vuejs.org/guide/reactivity.html","ad142cab79a916bd6ae4e89e6df05b09"],["/tr.vuejs.org/guide/render-function.html","6beb8d6e0a6d5586bdaea1b91d72818c"],["/tr.vuejs.org/guide/routing.html","2a08502f089d3f750bcf7c0dcecf00ac"],["/tr.vuejs.org/guide/single-file-components.html","aeba18116c107413d309a9d9bc379c59"],["/tr.vuejs.org/guide/ssr.html","3332d148dacb6be263c5fa165cd29501"],["/tr.vuejs.org/guide/state-management.html","1e94ecc7dc91e72206be3f78f2f88ef8"],["/tr.vuejs.org/guide/syntax.html","ea0438a5d18799938399c70a96fd257f"],["/tr.vuejs.org/guide/transitioning-state.html","438a127943b5dca0747c03d72e0391d0"],["/tr.vuejs.org/guide/transitions.html","7e5fa518b917a39b48f927cd7975c88b"],["/tr.vuejs.org/guide/unit-testing.html","c749c9e16c48da06789bb353f0f72682"],["/tr.vuejs.org/images/aaha.png","77bfeb59f772f37444c9cefe00785cf2"],["/tr.vuejs.org/images/accelebrate.png","e030e08131cebe8b43c89df18d710ded"],["/tr.vuejs.org/images/alligator_io.svg","1ffe0191e22a65337f9cb224790f5222"],["/tr.vuejs.org/images/bacancy_technology.png","9a0590eb4ce29289b454240415611162"],["/tr.vuejs.org/images/bestvpn_co.png","afbe252b6b59bc3cdac2e7dec69eac39"],["/tr.vuejs.org/images/bit.png","9638a3f44bf471876effb80ea0659f73"],["/tr.vuejs.org/images/blokt_cryptocurrency_news.png","1517a40ef0fafa2968313c2febef3ad3"],["/tr.vuejs.org/images/breakpoint_hit.png","114924925a4ec0f23236012bc3dc8422"],["/tr.vuejs.org/images/breakpoint_set.png","6439856732303cfeb3806d52dd681191"],["/tr.vuejs.org/images/chaitin.png","549e43997790dc624c477424acbfe228"],["/tr.vuejs.org/images/check.png","c634675b753a1a03b587c43d8b535600"],["/tr.vuejs.org/images/cloudstudio.png","fc480cf4c2b06591f58e7e91666226af"],["/tr.vuejs.org/images/coding.png","10c55345da3c2374563b096f5c86d781"],["/tr.vuejs.org/images/coin-bch.png","ddfab54149483e02f3cd540a47e2782b"],["/tr.vuejs.org/images/coin-btc.png","d90559bb202766dd6ddabf71dd1680be"],["/tr.vuejs.org/images/coin-eth.png","70ae70292937880fe9e77c2c7dc38f86"],["/tr.vuejs.org/images/coin-ltc.png","9e756bd611ac7355515153cecbc20d36"],["/tr.vuejs.org/images/components.png","b5c08269dfc26ae6d7db3801e9efd296"],["/tr.vuejs.org/images/config_add.png","353cd8b2a1bdf9fc4c74a80c5f38090a"],["/tr.vuejs.org/images/data.png","5de7af21d4c2de951720c006f84b98fc"],["/tr.vuejs.org/images/dcloud.gif","ade7c64e66506b6cff10292efea16ee8"],["/tr.vuejs.org/images/derek_pollard.png","b1c4d535b619865d80d6cf1b2e370300"],["/tr.vuejs.org/images/devsquad.png","e639ea4fd0d7053fc0928d4ff9fefb2a"],["/tr.vuejs.org/images/devtools-storage-chrome.png","ac1f3b275b87e2fec9c4df951347be81"],["/tr.vuejs.org/images/devtools-storage-edge.png","3e92a3bea017b8398e71db0a2419a191"],["/tr.vuejs.org/images/devtools-storage.png","e742c3b1d526bee7be77c050f4bffc92"],["/tr.vuejs.org/images/devtools-timetravel.gif","fca84f3fb8a8d10274eb2fc7ed9b65f9"],["/tr.vuejs.org/images/dom-tree.png","f70b86bfbbfe1962dc5d6125105f1122"],["/tr.vuejs.org/images/dopamine.png","17222090b66cfca59f1ccf8b9843f595"],["/tr.vuejs.org/images/down.png","2f948222df409af3121254d5fe0ed377"],["/tr.vuejs.org/images/earthlink.png","88f1bd15252b11484834176965844e22"],["/tr.vuejs.org/images/energy_comparison.png","1f3f2809057b867842c99679e2723b3e"],["/tr.vuejs.org/images/feed.png","a9bbd11a96e1cbcc49bf8fa857a0d70f"],["/tr.vuejs.org/images/firestick_tricks.png","1ee05223a5b12fe910cb8428d57223d8"],["/tr.vuejs.org/images/frontend_love.png","b514babc53a0f3ddc854b0b14a54a489"],["/tr.vuejs.org/images/gitee.png","429b3c31a180461c4fb66e5ac20e1385"],["/tr.vuejs.org/images/gridsome.png","e82a2f872ec319bbb5d0a804288cd9b7"],["/tr.vuejs.org/images/hn-architecture.png","b42f49a4e265649f870685b171e4b170"],["/tr.vuejs.org/images/hn.png","99176cdebac521e823be519aef514bb3"],["/tr.vuejs.org/images/html_burger.png","c7ce1344d001e7a236a89694ed59d988"],["/tr.vuejs.org/images/icons.png","ad6ee8c400066e15712cdef4342023da"],["/tr.vuejs.org/images/icons/android-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/tr.vuejs.org/images/icons/android-icon-192x192.png","5d10eaab941eb596ee59ffc53652d035"],["/tr.vuejs.org/images/icons/android-icon-36x36.png","bb757d234def1a6b53d793dbf4879578"],["/tr.vuejs.org/images/icons/android-icon-48x48.png","0d33c4fc51e2bb020bf8dd7cd05db875"],["/tr.vuejs.org/images/icons/android-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/tr.vuejs.org/images/icons/android-icon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/tr.vuejs.org/images/icons/apple-icon-114x114.png","f4fd30f3a26b932843b8c5cef9f2186e"],["/tr.vuejs.org/images/icons/apple-icon-120x120.png","b6a574d63d52ef9c89189b67bcac5cbd"],["/tr.vuejs.org/images/icons/apple-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/tr.vuejs.org/images/icons/apple-icon-152x152.png","f53787bf41febf2b044931a305ccaf2a"],["/tr.vuejs.org/images/icons/apple-icon-180x180.png","9f6b1e3b92b2c5bd5b7d79501bb6e612"],["/tr.vuejs.org/images/icons/apple-icon-57x57.png","83f622ba0994866abc56ace068b6551c"],["/tr.vuejs.org/images/icons/apple-icon-60x60.png","643f761bc39f86c70f17cd1fed3b8e08"],["/tr.vuejs.org/images/icons/apple-icon-72x72.png","702c4fafca31d670f9bd8b2d185ced39"],["/tr.vuejs.org/images/icons/apple-icon-76x76.png","94d9af047b86d99657b5efb88a0d1c7b"],["/tr.vuejs.org/images/icons/apple-icon-precomposed.png","707758f591323153a4f1cb3a8d9641fa"],["/tr.vuejs.org/images/icons/apple-icon.png","707758f591323153a4f1cb3a8d9641fa"],["/tr.vuejs.org/images/icons/bacancy_technology.png","5810bb8253b1e35ba437373ff83f82d3"],["/tr.vuejs.org/images/icons/favicon-16x16.png","a5a9da66870189b0539223c38c8a7749"],["/tr.vuejs.org/images/icons/favicon-32x32.png","3d60db0d77303b2414ddd50cf2472bf7"],["/tr.vuejs.org/images/icons/favicon-96x96.png","0ebff702851985ea6ba891cf6e6e7ddd"],["/tr.vuejs.org/images/icons/ms-icon-144x144.png","e67b8d54852c2fbf40be2a8eb0590f5b"],["/tr.vuejs.org/images/icons/ms-icon-150x150.png","e8cdf492981122a2548bc247c7b4067d"],["/tr.vuejs.org/images/icons/ms-icon-310x310.png","1721f8303ec2349002b5980a01f27cef"],["/tr.vuejs.org/images/icons/ms-icon-70x70.png","a110cf0132b00b23a8605ca72a8874ba"],["/tr.vuejs.org/images/icons_8.png","ffcdd01817ecdb32b92bd2f1e4d75e84"],["/tr.vuejs.org/images/inkoop.png","1cff77d2c927657d3aceeba2c12db892"],["/tr.vuejs.org/images/intygrate.png","fdd390b44a4aeed763f53f4e8f6529e4"],["/tr.vuejs.org/images/isle_of_code.png","42f662ab71b943889f8f8b56515350f2"],["/tr.vuejs.org/images/jqwidgets_.png","b6a0a55c85816adb196e1f7450a7f3d7"],["/tr.vuejs.org/images/jqwidgets_ltd.png","6d209e39ca89483f3677ae859edca4d7"],["/tr.vuejs.org/images/laravel.png","9a2fba3eca41e26743dc731e3a4469b6"],["/tr.vuejs.org/images/lifecycle.png","6f2c97f045ba988851b02056c01c8d62"],["/tr.vuejs.org/images/logged-proxied-data.png","716e3c41aacf453cfaedd61c2795f0ec"],["/tr.vuejs.org/images/logo.png","cf23526f451784ff137f161b8fe18d5a"],["/tr.vuejs.org/images/marcus_hiles.png","8b55f40abd154200ce72b8cdb6a8d90f"],["/tr.vuejs.org/images/memory-leak-example.png","c2fae8bd6d8fa50632f9cde80be8b3f6"],["/tr.vuejs.org/images/menu.png","0b414c367f5e7c0eb1b40f1076216b08"],["/tr.vuejs.org/images/modus.png","6498c04fee5b8542449b350e77180379"],["/tr.vuejs.org/images/mvvm.png","4fbd3c1bc80d47038f3e66cf1478a1a3"],["/tr.vuejs.org/images/nativescript.png","05c94493b428db55bb441faaca4b02d8"],["/tr.vuejs.org/images/neds.png","1f1a2a46c2575019ae07a90205f60b65"],["/tr.vuejs.org/images/onsen_ui.png","e41569bcb10fbca3f361d818b29ed7fd"],["/tr.vuejs.org/images/opteo.png","e80eaa359d4722af5fd8fed79fb9eec5"],["/tr.vuejs.org/images/passionate_people.png","03e59e28347e1dcd165e4e1525afb545"],["/tr.vuejs.org/images/patreon.png","99eb0cdcab5f46697e07bec273607903"],["/tr.vuejs.org/images/paypal.png","067bd556ce9e4c76538a8057adb6d596"],["/tr.vuejs.org/images/props-events.png","8996ef20503fbf264a0bfdeafccca74a"],["/tr.vuejs.org/images/search-by-algolia.png","3f22d84b817bb896bd5bef0705ff8fc7"],["/tr.vuejs.org/images/search.png","3a38056b0f3ec4fcac63c4d1c3841cab"],["/tr.vuejs.org/images/shopware_ag.png","e2ded483c0660bd629938e37f388d9fb"],["/tr.vuejs.org/images/shopware_ag.svg","5d2a8176b6e1b0a348339746de3edf28"],["/tr.vuejs.org/images/special-sponsor-spot.png","860ea231e9bd1b3ff35e627eb83bb936"],["/tr.vuejs.org/images/state.png","6a05b01942c7d2cff4ea0033ded59ebb"],["/tr.vuejs.org/images/stdlib.png","8693858c969505b29339bf84c0a5cbdf"],["/tr.vuejs.org/images/syncfusion.png","fd1617455479c2e3265656c167faeb91"],["/tr.vuejs.org/images/tidelift.png","831935bd53d7d2d4eea9427c5f874816"],["/tr.vuejs.org/images/tighten_co.png","003364e7044150e2979cbfe03d640cec"],["/tr.vuejs.org/images/tooltwist.png","b81bfd5ae608e965d03aaa5a4164373e"],["/tr.vuejs.org/images/transition.png","5990c1dff7dc7a8fb3b34b4462bd0105"],["/tr.vuejs.org/images/typescript-type-error.png","1665e7350370c091d397383a7355d3a6"],["/tr.vuejs.org/images/valuecoders.png","818ca42a745e018ace0c55c36a7ae3dd"],["/tr.vuejs.org/images/vehikl.png","3bd1b88aa9d242d308e838f2342d7660"],["/tr.vuejs.org/images/vpnranks.png","a657f71ef96eb8c22c7f1496c01ca53a"],["/tr.vuejs.org/images/vue-component-with-preprocessors.png","a5cb959052c9cda793e23a6e3a6a122c"],["/tr.vuejs.org/images/vue-component.png","6a7040cfd4330a536d980c69e2e8dd18"],["/tr.vuejs.org/images/vuejobs.png","77ed618e17571d1a2d77ad7bc53e8fc4"],["/tr.vuejs.org/images/vuemastery.png","6f09ce143467fba22039bde3f2070c19"],["/tr.vuejs.org/images/vueschool.png","3d92b4f1a8fcbe3be0d0e89950a1a705"],["/tr.vuejs.org/images/vuetify.png","c7cfff77abb10162cb0b7c2ed3b6ac51"],["/tr.vuejs.org/images/webdock.png","6b8d3d271ba4d05daf83ad75d21221d1"],["/tr.vuejs.org/images/wilderminds.png","cd98b69653b51369da2e765097f13d6f"],["/tr.vuejs.org/images/x_team.png","a6cfaebb0c0dc17d348bc9c6fd5758ef"],["/tr.vuejs.org/images/yakaz.png","f1918919114e35d6091e67370450e8bd"],["/tr.vuejs.org/index.html","4182306d1e6b8c9c6f46b798c98afc0b"],["/tr.vuejs.org/js/common.js","3fd6eb4d90b6ad57886c6ede0670d59e"],["/tr.vuejs.org/js/css.escape.js","fe4db48c9e3f272a6d12cf1312de889e"],["/tr.vuejs.org/js/smooth-scroll.min.js","ecaa94f311c27bd2ac704a9658ff9cef"],["/tr.vuejs.org/js/vue.js","d5c38adb09ff79efa1c4d0745dfd308c"],["/tr.vuejs.org/js/vue.min.js","17e942ea0854bd9dce2070bae6826937"],["/tr.vuejs.org/manifest.json","bd8de9895abf2cc1faa760a8bd1004d8"],["/tr.vuejs.org/menu/index.html","3b593b5d7e9d985b0102df42a59a2211"],["/tr.vuejs.org/page/2/index.html","2f7b56d33fe37f617c6fea787b7b3682"],["/tr.vuejs.org/perf/index.html","0824c4f58371e15e334c2f1c719bafef"],["/tr.vuejs.org/support-vuejs/index.html","8403ba08da4f5896b94085f6fe552be9"],["/tr.vuejs.org/v2/api/index.html","4bfdd2b02982add844bd997ac150b542"],["/tr.vuejs.org/v2/cookbook/adding-instance-properties.html","9c5d211f20b081061b3c27718311799b"],["/tr.vuejs.org/v2/cookbook/avoiding-memory-leaks.html","d97f1809fdebecb426e23578c238cb65"],["/tr.vuejs.org/v2/cookbook/client-side-storage.html","faae6ccb2737fea4d9b5d8865453e6b5"],["/tr.vuejs.org/v2/cookbook/creating-custom-scroll-directives.html","664cc3ae2006941f9b25b29ad8cd32dc"],["/tr.vuejs.org/v2/cookbook/debugging-in-vscode.html","f979898323ff4850004e6c7f280e84ac"],["/tr.vuejs.org/v2/cookbook/dockerize-vuejs-app.html","cc782f1dff403a6f376697610cb2cd7b"],["/tr.vuejs.org/v2/cookbook/editable-svg-icons.html","d32fa74ced4064fadfe69d6c6313e6f2"],["/tr.vuejs.org/v2/cookbook/form-validation.html","1e8dca795cf5e2d7f51e1779b5e970a7"],["/tr.vuejs.org/v2/cookbook/index.html","49111c7333a0be4698547800ff1e771e"],["/tr.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html","39172b287888fadc07d2667b6fcc0aeb"],["/tr.vuejs.org/v2/cookbook/practical-use-of-scoped-slots.html","5bf3e3c9d24669dd61d003f874de59de"],["/tr.vuejs.org/v2/cookbook/serverless-blog.html","76b1b5f41a73e3c4da9099872a25b91c"],["/tr.vuejs.org/v2/cookbook/unit-testing-vue-components.html","f50238956ae997f6bbae7889c1a62cb9"],["/tr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html","4147a2c0a09bc144a971afd72eab633d"],["/tr.vuejs.org/v2/examples/commits.html","eaa3c11731ed2a65c772a5848b2ced84"],["/tr.vuejs.org/v2/examples/deepstream.html","06c4daa891c738f406ac070440bca32b"],["/tr.vuejs.org/v2/examples/elastic-header.html","dafb273fab3fba6a1897980caec3abfd"],["/tr.vuejs.org/v2/examples/firebase.html","76ab029f30e8894d1e4998627482b22f"],["/tr.vuejs.org/v2/examples/grid-component.html","60343ddb4b41f08b522976e088fec411"],["/tr.vuejs.org/v2/examples/hackernews.html","fc7490e48c70eeceff96e1c10664a627"],["/tr.vuejs.org/v2/examples/index.html","5839647f97f14e1e07b6ee7f4ba1aa42"],["/tr.vuejs.org/v2/examples/modal.html","2b2ccc21753dc70147c0153679ff5116"],["/tr.vuejs.org/v2/examples/select2.html","b4caa1c7acdf38fad5136c8939ccb135"],["/tr.vuejs.org/v2/examples/svg.html","c8fc32c596dcfd7688e19a3a477736c5"],["/tr.vuejs.org/v2/examples/themes.html","39fba21920fd369fc24f4111b4004d9b"],["/tr.vuejs.org/v2/examples/todomvc.html","4afba99da2f0c0ee8e520d972ece1d77"],["/tr.vuejs.org/v2/examples/tree-view.html","b96ec4faf973df5d05c5373b40e4c34e"],["/tr.vuejs.org/v2/guide/class-and-style.html","92b4feeea7cf894bdd91f437b39a295d"],["/tr.vuejs.org/v2/guide/comparison.html","5dd02fba2ad4329a2c28648625bbbefa"],["/tr.vuejs.org/v2/guide/components-custom-events.html","2056cfb7da52955bd510bd33551f715f"],["/tr.vuejs.org/v2/guide/components-dynamic-async.html","05c8c97285adbcede3bfff319d9e2e36"],["/tr.vuejs.org/v2/guide/components-edge-cases.html","2cde96d530f21d29c0eaeb23371df4ec"],["/tr.vuejs.org/v2/guide/components-props.html","7671a79468da105fcc8a480d8ae99461"],["/tr.vuejs.org/v2/guide/components-registration.html","95f7b9175ffeb175986dd2be42cae83d"],["/tr.vuejs.org/v2/guide/components-slots.html","038c606afef5e19c2139f00da25b1548"],["/tr.vuejs.org/v2/guide/components.html","795398547f512c6f502467021df5d368"],["/tr.vuejs.org/v2/guide/computed.html","731980c8490f7a9aadb3c1e5ffb851ce"],["/tr.vuejs.org/v2/guide/conditional.html","568264928d2c99f8dbc9ad5c0af95039"],["/tr.vuejs.org/v2/guide/custom-directive.html","ca3e7a0a729072e2d3953e0178765951"],["/tr.vuejs.org/v2/guide/deployment.html","a8a3a1be67dc4987399fac6ef267dbdf"],["/tr.vuejs.org/v2/guide/events.html","e9c2a334a7388ebd8571ca60bac3d7ed"],["/tr.vuejs.org/v2/guide/filters.html","0daf5735ec237d977d339b8ff35e7d61"],["/tr.vuejs.org/v2/guide/forms.html","346735531c2a26c9f3ddba6767098c60"],["/tr.vuejs.org/v2/guide/index.html","ef9ac39c176bba0231d961a375f7ecf4"],["/tr.vuejs.org/v2/guide/installation.html","2b883735f9b444d6f1ceb930d7148ef4"],["/tr.vuejs.org/v2/guide/instance.html","a8e3a19ba79da39809ce73be1c389a55"],["/tr.vuejs.org/v2/guide/join.html","63f9191cc8ed04d8e080275f02a1af03"],["/tr.vuejs.org/v2/guide/list.html","d56b740c950fcf1014e73114712c1503"],["/tr.vuejs.org/v2/guide/migration-vue-router.html","b5fc50c765c1c760a021cf8aef8d7f20"],["/tr.vuejs.org/v2/guide/migration-vuex.html","be0cb400837d97e7515099c89b52414b"],["/tr.vuejs.org/v2/guide/migration.html","9cbd17929e0f9f4eac5ae7778f101c56"],["/tr.vuejs.org/v2/guide/mixins.html","33196e3e17f57943a818d4889c11b06f"],["/tr.vuejs.org/v2/guide/plugins.html","66fa0760c7941ed44f0a2173299b4483"],["/tr.vuejs.org/v2/guide/reactivity.html","b7d80107e051e5c66fc49703c8b0b127"],["/tr.vuejs.org/v2/guide/render-function.html","fa16596a30341b810dad6bfeb7e7eda5"],["/tr.vuejs.org/v2/guide/routing.html","65475a9d0d640c7832924049fbc520b4"],["/tr.vuejs.org/v2/guide/single-file-components.html","f770d3f3ea43e0826b5562db86825e1d"],["/tr.vuejs.org/v2/guide/ssr.html","aacd718b7217e2ea0543a5523beea53f"],["/tr.vuejs.org/v2/guide/state-management.html","f07f7a2a2f77b9ff81693208bbe7fa6b"],["/tr.vuejs.org/v2/guide/syntax.html","80042f3672de99b591647f70c5ecebc1"],["/tr.vuejs.org/v2/guide/team.html","b5135c8c22853441e3eae9696fa69727"],["/tr.vuejs.org/v2/guide/transitioning-state.html","74fd721d9973476af73dafcb2e68711c"],["/tr.vuejs.org/v2/guide/transitions.html","8c211aa98b0e55d7d92ea6675d75edff"],["/tr.vuejs.org/v2/guide/typescript.html","996df0903ecae99a9b3533cbadd47d09"],["/tr.vuejs.org/v2/guide/unit-testing.html","e4a24619302405aad4c5cc1e5cef0dc8"],["/tr.vuejs.org/v2/search/index.html","72d17a270a37b48027000fab414941fd"],["/tr.vuejs.org/v2/style-guide/index.html","5214dc5a20b6a9ec90e1aa50165017bb"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.networkFirst, {"origin":"sendgrid.sp1.convertro.com"});
toolbox.router.get("/*", toolbox.networkFirst, {"origin":"ad.doubleclick.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.jsdelivr.net"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.googleapis.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"fonts.gstatic.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdnjs.cloudflare.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"maxcdn.bootstrapcdn.com"});




