$(function () {
  //基本設定
  var width = 900;
  var height = 900;

  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  var scene = new THREE.Scene();

  // カメラ設定
  var camera = new THREE.PerspectiveCamera(3, width / height, 1, 10000);
  camera.position.set(45, 15, 200);

  // ライト設定
  ambientLight = new THREE.AmbientLight(0xffffff);
  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x4169e1, 0.15);
  scene.add(hemisphereLight);
  scene.add(ambientLight);

  // 座標軸を表示
  /*   var axes = new THREE.AxisHelper(25);
  scene.add(axes); */

  // オービットコントロール
  var controls = new THREE.OrbitControls(camera);

  // MTL,Obj読み込み
  new THREE.MTLLoader().setPath("./three/").load("yadon.mtl", function (materials) {
    materials.preload();
    new THREE.OBJLoader()
      .setPath("./three/")
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

  // 星屑を作成 (カメラの動きをわかりやすくするため)
  createStarField();

  function createStarField() {
    // 形状データを作成
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(new THREE.Vector3(20 * (Math.random() - 0.5), 20 * (Math.random() - 0.5), 20 * (Math.random() - 0.5)));
    }
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
    });

    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }

  // 実行
  animate();
  function animate() {
    requestAnimationFrame(animate);
    obj.rotation.x += 0.0001;
    obj.rotation.y += 0.0005;
    obj.rotation.z += 0.0003;
    renderer.render(scene, camera);
  }

  // 画面リサイズ
  onResize();
  window.addEventListener("resize", onResize);
  function onResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
});
