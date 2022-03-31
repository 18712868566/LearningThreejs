
function main() {
    const canvas = document.querySelector('#c');
    // antialias: true 抗锯齿
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    // 设置渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = 120;
    const aspect = window.innerWidth / window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    camera.position.z = 2;

    //创建舞台 
    const scene = new THREE.Scene();

    // 添加环境灯光
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // 创建一个立方体
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // MeshBasicMaterial 不受灯光影响的材质
    // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });  // greenish blue

    // MeshPhongMaterial 不受灯光影响的材质
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // greenish blue


    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    function render(time) {
        time *= 0.001;  // 将时间单位变为秒

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);


    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

}

main();

