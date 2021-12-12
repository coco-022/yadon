// ページの読み込みを待つ
window.addEventListener("load", init);

function init() {
  //-----------------------------------------------------//
  //  レンダラーを作成
  //-----------------------------------------------------//
  const width = document.body.clientWidth;
  const height = window.innerHeight;
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    alpha: true, //背景透過
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);


  //-----------------------------------------------------//
  //  シーンを作成
  //-----------------------------------------------------//
  var scene = new THREE.Scene();


  //-----------------------------------------------------//
  //  カメラを作成
  //-----------------------------------------------------//
  var camera = new THREE.PerspectiveCamera(3, width / height, 1, 10000);
  camera.position.set(45, 15, 150);
  var controls = new THREE.OrbitControls(camera);  // オービットコントロール


  //-----------------------------------------------------//
  //  ライトを作成
  //-----------------------------------------------------//
  //  環境光源
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
  //  平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.position.set(0, 500, 0);
  scene.add(directionalLight);


  //-----------------------------------------------------//
  //  3dオブジェクトを作成
  //-----------------------------------------------------//
  new THREE.MTLLoader().setPath("obj/").load("yadon.mtl", function (materials) {
    materials.preload();
    new THREE.OBJLoader()
      .setPath("obj/")
      .setMaterials(materials)
      .load("yadon.obj", function (object) {
        objmodel = object.clone();
        obj = new THREE.Object3D();
        obj.add(objmodel);
        obj.position.set(-0.5, -1.4, 0.7);
        scene.add(obj);
      });
  });
  var obj = new THREE.Mesh();


  //-----------------------------------------------------//
  //  パーティクルを作成
  //-----------------------------------------------------//
  createStarField();
  function createStarField() {

    const geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(new THREE.Vector3(20 * (Math.random() - 0.5), 20 * (Math.random() - 0.5), 20 * (Math.random() - 0.5)));
    }

    const material = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

  }


  //-----------------------------------------------------//
  //  レンダリング設定
  //-----------------------------------------------------//
  tick();
  function tick() {
    obj.rotation.x += 0.0001;
   obj.rotation.y += 0.0003;
    obj.rotation.z += 0.0005;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }


  //-----------------------------------------------------//
  //   リサイズ
  //-----------------------------------------------------//
  onResize();
  window.addEventListener("resize", onResize);
  function onResize() {
    var width = document.body.clientWidth;
    var height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); //カメラの設定更新
  }
}
