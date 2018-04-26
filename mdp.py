import numpy as np
#状态转移概率矩阵P
P=np.array([
    [0.9,0.1,0,0,0,0,0],
    [0.5,0,0.5,0,0,0,0],
    [0,0,0,0.8,0,0,0.2],
    [0,0,0,0,0.6,0,0.4],
    [0,0,0,0,0,1,0],
    [0, 0, 0, 0, 0, 1, 0],
    [0,0.2,0.4,0.4,0,0,0]
])

def bellman_equ(gamma,P,R,v_old):
    return R+gamma*np.sum(P*v_old)


gamma=1
R=np.array([-1,-2,-2,-2,10,0,1])

V=np.zeros([7,200])
for i in range(1,199):
    v=np.zeros([7])
    for j in range(7):
        a=bellman_equ(gamma,P[j,:],R[j],V[:,i])
        v[j]=a
    V[:,i+1]=v

print(V)