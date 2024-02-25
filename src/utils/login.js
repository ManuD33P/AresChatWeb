export function Login (visitorGuid, visitorId, name, avatar, perMsg) {
    var proto = "5000";
    var guid = visitorGuid;
    var device =
      navigator.platform + ";" + navigator.userAgent + ";" + visitorId;
    var client = `Ares Chat Web By ManuDeev`;
    var photo =
      avatar === "/default.png" || !avatar ? avatar : avatar.split(",")[1];
    if (!guid) {
      guid = "";
      for (var i = 0; i < 16; i++) {
        var h = Math.floor(Math.random() * 256).toString(16);
        if (h.length === 1) h = "0" + h;
        guid += h;
      }
      guid = guid.toUpperCase();
      localStorage.setItem("guidares", guid);
    }
    var p = "LOGIN:";
    p += proto.length + ",";
    p += guid.length + ",";
    p += name.length + ",";
    p += device.length + ",";
    p += client.length;
    p += `,${perMsg ? perMsg.length : client.length},${photo.length}`;
    p += ":";
    p += proto;
    p += guid;
    p += name;
    p += device;
    p += client;
    p += `${perMsg ? perMsg : client}${photo}`;
    return p;
  }



  export default Login