var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "#####_#####": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/server/level/DistanceManager",
                "methodName": "<init>",
                "methodDesc": "(Ljava/util/concurrent/Executor;Ljava/util/concurrent/Executor;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("net/minecraft/server/level/DistanceManager") && node.name.equals(ASMAPI.mapField("f_140765_")) && node.desc.equals("Ljava/util/Set;")) {
                        mn.instructions.insertBefore(node, new InsnNode(Opcodes.POP));
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "java/util/concurrent/ConcurrentHashMap", "newKeySet", "()Ljava/util/concurrent/ConcurrentHashMap$KeySetView;", false));
                    }
                }
                return mn;
            }
        }
    }
}
