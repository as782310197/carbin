<template>
  <a-card class="monitoringCard">
    <div>
      <a-row>
        <!-- 左边树状控件 -->
        <a-col :span="5" class="treeMenu" width="20%">
          <div class="treeDiv">
            <a-tree
              :showLine="true"
              @expand="onExpand"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              @select="onSelect"
              :selectedKeys="selectedKeys"
              :treeData="treeData"
            >
              <a-icon slot="switcherIcon" type="caret-down" />
            </a-tree>
          </div>
        </a-col>
        <!-- 右边显示内容 -->
        <a-col :span="19" class="content" width="80%">
          <!-- 按钮 -->
          <div class="btnDiv">
            <!-- <a-button type="primary" style="margin-bottom: 20px;">
              切换显示样式 </a-button> -->
            <router-link :to="{ name: 'WorkOrderList' }">
              <a-button type="primary" style="margin-bottom: 20px; margin-left:20px;">
                创建工单  </a-button>
            </router-link>
          </div>
          <!-- 显示图像 -->
          <div class="viewDiv">
            <div class="wrap">
              <div class="box">
                <div class="title-box">
                  <div class="left-title-box">
                    <ul>
                      <li>L1</li>
                      <li>L2</li>
                      <li>L3</li>
                      <li>L4</li>
                      <li>L5</li>
                    </ul>
                  </div>
                  <div class="right-title-box">
                    <ul>
                      <li>R1</li>
                      <li>R2</li>
                      <li>R3</li>
                      <li>R4</li>
                      <li>R5</li>
                    </ul>
                  </div>
                  <div class="top-title-box">
                    <ul>
                      <li>Z3</li>
                      <li>Z1</li>
                      <li>Z0</li>
                      <li>Z2</li>
                      <li>Z4</li>
                    </ul>
                  </div>
                </div>
                <!-- 边框实线 -->
                <div class="line-solid">
                  <div class="line-solid-top"></div>
                  <div class="line-solid-bottom"></div>
                </div>
                <!-- 边框虚线 -->
                <div class="line-dashed">
                  <div class="line-dashed-top"></div>
                  <div class="line-dashed-bottom"></div>
                </div>
                <!-- 主体、左（left）右（right）弧形5条射线 -->
                <ul ref="lightHeight">
                  <li>
                    <div class="circle01">
                      <div class="circle02"></div>
                    </div>
                  </li>
                  <li>
                    <!-- L1 -->
                    <div class="left left-01">
                      <ul id="left_1">
                        <li :class="lamp.L1 ? lamp.L1[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L1 ? lamp.L1[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                    <div class="middle"></div>
                    <!-- R1 -->
                    <div class="right right-01">
                      <ul>
                        <li :class="lamp.R1 ? lamp.R1[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R1 ? lamp.R1[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <!-- L2 -->
                    <div class="left left-02">
                      <ul>
                        <li :class="lamp.L2 ? lamp.L2[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L2 ? lamp.L2[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                    <div class="middle"></div>
                    <!-- R2 -->
                    <div class="right right-02">
                      <ul>
                        <li :class="lamp.R2 ? lamp.R2[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R2 ? lamp.R2[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <!-- L3 -->
                    <div class="left left-03">
                      <ul>
                        <li :class="lamp.L3 ? lamp.L3[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L3 ? lamp.L3[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                    <div class="middle"></div>
                    <!-- R3 -->
                    <div class="right right-03">
                      <ul>
                        <li :class="lamp.R3 ? lamp.R3[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R3 ? lamp.R3[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <!-- L4 -->
                    <div class="left left-04">
                      <ul>
                        <li :class="lamp.L4 ? lamp.L4[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L4 ? lamp.L4[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                    <div class="middle"></div>
                    <!-- R4 -->
                    <div class="right right-04">
                      <ul>
                        <li :class="lamp.R4 ? lamp.R4[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R4 ? lamp.R4[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <!-- L5 -->
                    <div class="left left-05">
                      <ul>
                        <li :class="lamp.L5 ? lamp.L5[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.L5 ? lamp.L5[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                    <div class="middle"></div>
                    <!-- R5 -->
                    <div class="right right-05">
                      <ul>
                        <li :class="lamp.R5 ? lamp.R5[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                        <li :class="lamp.R5 ? lamp.R5[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div class="circle03"></div>
                  </li>
                </ul>
                <!-- 中间部分（top）显示灯5条射线 -->
                <div class="top" id="topLight">
                  <!-- Z3 -->
                  <ul class="top-01">
                    <li :class="lamp.Z3 ? lamp.Z3[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z3 ? lamp.Z3[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                  </ul>
                  <!-- Z1 -->
                  <ul class="top-02">
                    <li :class="lamp.Z1 ? lamp.Z1[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z1 ? lamp.Z1[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                  </ul>
                  <!-- Z0 -->
                  <ul class="top-03">
                    <li :class="lamp.Z0 ? lamp.Z0[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z0 ? lamp.Z0[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                  </ul>
                  <!-- Z2 -->
                  <ul class="top-04">
                    <li :class="lamp.Z2 ? lamp.Z2[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z2 ? lamp.Z2[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                  </ul>
                  <!-- Z4 -->
                  <ul class="top-05">
                    <li :class="lamp.Z4 ? lamp.Z4[0] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[1] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[2] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[3] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[4] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[5] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[6] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[7] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[8] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[9] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[10] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[11] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[12] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[13] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[14] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                    <li :class="lamp.Z4 ? lamp.Z4[15] == 1 ? 'activenormal' : 'activefault' : ''"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 显示数据 -->
          <div class="dataDiv">
            <detail-list :col="3">
              <detail-list-item term="所属工点">{{ taskInfoData.constructionPointname }}</detail-list-item>
              <detail-list-item term="任务名称">{{ taskInfoData.taskName }}</detail-list-item>
              <detail-list-item term="创建时间">{{ taskInfoData.createTime }}</detail-list-item>
            </detail-list>
            <detail-list :col="3">
              <detail-list-item term="左右差值">{{ taskInfoData.horizontalDifference }}</detail-list-item>
              <detail-list-item term="前后差值">{{ taskInfoData.verticalDifference }}</detail-list-item>
              <detail-list-item term="密实率">{{ taskInfoData.compactness }}</detail-list-item>
            </detail-list>
            <detail-list :col="3">
              <detail-list-item term="施工员">{{ taskInfoData.constructorName }}</detail-list-item>
              <detail-list-item term="监理员">{{ taskInfoData.qualityInspectorName }}</detail-list-item>
              <detail-list-item term="质检员">{{ taskInfoData.supervisorName }}</detail-list-item>
            </detail-list>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <div class="tableDiv">
          <!-- 表格 -->
          <a-table
            :columns="lightColumns"
            :data-source="lightData"
            size="small"
            bordered
            :pagination="false"
            :scroll="{x: true}">
            <!-- <template slot="name" slot-scope="text">
              <a>{{ text }}</a>
            </template> -->
          </a-table>
        </div>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getMonitoringTreeList, getTaskMessageInfo } from '@/api/Monitoring'
import DetailList from '@/components/DescriptionList/DescriptionList'
import Stomp from 'stompjs'
import { mqtt } from '@/utils/util.js'

const DetailListItem = DetailList.Item
// const MQTT_SERVICE = 'ws://192.168.50.71:15674/ws' // mqtt服务地址
const MQTT_USERNAME = 'admin' // mqtt连接用户名
const MQTT_PASSWORD = '123456' // mqtt连接密码

export default {
  name: 'MonitoringList',
  components: {
    DetailList,
    DetailListItem,
    Stomp,
    STable
  },
  data () {
    return {
      autoExpandParent: false, // 是否自动展开父节点
      expandedKeys: [], // （受控）展开指定的树节点
      selectedKeys: [], // （受控）设置选中的树节点
      // treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
      treeData: [],
      taskInfoData: [], // 任务信息数据
      lamp: {}, // 故障和正常显示灯
      client: null,
      // 指示灯表格
      lightColumns: [
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 200,
          align: 'center'
        },
        {
          title: 'L1',
          dataIndex: 'L1',
          align: 'center'
        },
        {
          title: 'L2',
          dataIndex: 'L2',
          align: 'center'
        },
        {
          title: 'L3',
          dataIndex: 'L3',
          align: 'center'
        },
        {
          title: 'L4',
          dataIndex: 'L4',
          align: 'center'
        },
        {
          title: 'L5',
          dataIndex: 'L5',
          align: 'center'
        },
        {
          title: 'R1',
          dataIndex: 'R1',
          align: 'center'
        },
        {
          title: 'R2',
          dataIndex: 'R2',
          align: 'center'
        },
        {
          title: 'R3',
          dataIndex: 'R3',
          align: 'center'
        },
        {
          title: 'R4',
          dataIndex: 'R4',
          align: 'center'
        },
        {
          title: 'R5',
          dataIndex: 'R5',
          align: 'center'
        },
        {
          title: 'Z0',
          dataIndex: 'Z0',
          align: 'center'
        },
        {
          title: 'Z1',
          dataIndex: 'Z1',
          align: 'center'
        },
        {
          title: 'Z2',
          dataIndex: 'Z2',
          align: 'center'
        },
        {
          title: 'Z3',
          dataIndex: 'Z3',
          align: 'center'
        },
        {
          title: 'Z4',
          dataIndex: 'Z4',
          align: 'center'
        }
      ],
      lightData: [],
      taskId: '' // 任务id
    }
  },
  created () {
    getMonitoringTreeList().then(res => {
      this.treeData = res.result
    })
    // this.connect()
  },
  methods: {
    // 点击展开按钮的方法onExpand
    onExpand (expandedKeys) {
      // 如果未将autoExpandParent设置为false，则如果子级已展开，则父级无法折叠。
      // 或者，可以删除所有展开的子项。
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 点击树结构触发的事件
    onSelect (selectedKeys, info) {
      console.log(selectedKeys, info)
      this.selectedKeys = selectedKeys
      const param = { id: selectedKeys[0] }
      // console.log(info.node.$options.propsData.pos.split('-').length == 6)
      const len = info.node.$options.propsData.pos.split('-').length
      // 树结构到第五层才点击有效果
      if (len === 6 && selectedKeys.length > 0) {
        getTaskMessageInfo(param).then(res => {
          this.taskId = selectedKeys
          this.connect()
          const data = res.result
          this.taskInfoData = data
          this.lamp = data.dataMap
          // const light = data.dataList
          console.log(this.$refs.lightHeight.getElementsByClassName('left'))
        })
      } else {
        console.log(len)
      }
    },
    onConnected (frame) {
      var exchange = '/exchange/fanoutExchange.' + this.taskId
      this.client.subscribe(exchange, this.responseCallback, this.onFailed)
      console.log(frame)
    },
    onFailed (frame) {
      console.log('Failed' + frame)
    },
    responseCallback (frame) {
      console.log('得到的消息 msg=>' + frame.body)
      console.log(frame)
      const data = JSON.parse(frame.body)
      console.log(data.encodeData)
      if (this.lightData.length === 10) {
        this.lightData.unshift(data.encodeData)
        this.lightData.forEach((v, i) => {
          this.lightData[i].key = i + ''
        })
        this.lightData.pop()
      } else {
        this.lightData.unshift(data.encodeData)
        this.lightData.forEach((v, i) => {
          this.lightData[i].key = i + ''
        })
      }
      this.lamp = frame.body === '' ? {} : data.decodeData
      // 接收到服务器推送消息，向服务器定义的接收消息routekey路由rk_recivemsg发送确认消息
    },
    connect () {
      this.client = Stomp.client(mqtt())
      this.client.connect(MQTT_USERNAME, MQTT_PASSWORD, this.onConnected, this.onFailed)
    }
  }
}
</script>

<style scoped>
.ant-table td { white-space: nowrap; }

.treeMenu{
  border-right: 1px solid #cccccc;
}
.content{
  padding-left: 20px;
}
.dataDiv{
  margin-top: 20px;
}

/* 可视化显示图 */
.wrap,.box,ul,li,.line-solid,.line-dashed,.circle01,.circle02 {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
/* 显示灯正常颜色-绿色 */
.activenormal {
  background: #00BB00 !important;
}
/* 显示灯故障颜色-红色 */
.activefault {
  background: #EA0000 !important;
}
/* 没有数据时显示灯颜色-灰色 */
.activenodata {
  background: #BEBEBE !important;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

/* 标题标识 */
.viewDiv {
  margin-bottom: 50px;
}
/* L1-L5 */
.title-box>.left-title-box {
  position: absolute;
  top: -20px;
  left: 110px;
}
.title-box>.left-title-box>ul {
  display: flex;
}
.title-box>.left-title-box>ul>li {
  width: 115px;
  text-align: center;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  font-weight: bold;
}
/* R1-R5 */
.title-box>.right-title-box {
  position: absolute;
  top: 203px;
  left: 110px;
}
.title-box>.right-title-box>ul {
  display: flex;
}
.title-box>.right-title-box>ul>li {
  width: 115px;
  text-align: center;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  font-weight: bold;
}
/* Z0-Z4 */
.title-box>.top-title-box {
  position: absolute;
  top: 52px;
  right: -15px;
}
.title-box>.top-title-box>ul>li {
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  font-weight: bold;
}

.box {
  width: 800px;
  height: 200px;
  /* border-radius: 0 75px 75px 0; */
  /* border: 1px solid #c0c0c0; */
  position: relative;
}
/* 边框线-实线 */
.box>.line-solid>.line-solid-top {
  width: 86%;
  height: 1px;
  border-top: 1px solid #3C3C3C;
  position: absolute;
  left: 56px;
  top: 0px;
}
.box>.line-solid>.line-solid-bottom {
  width: 86%;
  height: 1px;
  border-top: 1px solid #3C3C3C;
  position: absolute;
  left: 56px;
  bottom: 0px;
}
/* 边框线-虚线 */
.box>.line-dashed>.line-dashed-top {
  width: 84%;
  height: 1px;
  border-top: 1px dashed #c0c0c0;
  position: absolute;
  left: 20px;
  top: 50px;
}
.box>.line-dashed>.line-dashed-bottom {
  width: 84%;
  height: 1px;
  border-top: 1px dashed #c0c0c0;
  position: absolute;
  left: 20px;
  bottom: 50px;
}
.box>ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.box>ul>li {
  width: 14%;
  height: 100%;
  /* border: 1px solid #000; */
}
/* 圆圈 */
.box>ul>li>.circle01 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #3C3C3C;
}
.box>ul>li>.circle01>.circle02 {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  border: 1px solid #3C3C3C;
  margin: 8% auto;
}
.box>ul>li>.circle03 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-top: 1px solid #3C3C3C;
  border-right: 1px solid #3C3C3C;
  border-bottom: 1px solid #3C3C3C;
  border-left: 1px dashed #c0c0c0;
  float: left;
}
/* middle */
.box>ul>li>.middle {
  width: 100%;
  height: 50%;
}
/* left */
.box>ul>li>.left {
  position: relative;
  width: 100%;
  height: 25%;
  /* border: 1px solid #ffffff; */
}

.box>ul>li>.left>ul>li {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #BEBEBE;
  border-radius: 5px;
  /* transform: rotate(90deg); */
}

.box>ul>li>.left>ul>li:nth-of-type(1) {
  top: 50px;
  left: 0px;
}
.box>ul>li>.left>ul>li:nth-of-type(2) {
  top: 38px;
  left: 5px;
}
.box>ul>li>.left>ul>li:nth-of-type(3) {
  top: 28px;
  left: 11px;
}
.box>ul>li>.left>ul>li:nth-of-type(4) {
  top: 20px;
  left: 18px;
}
.box>ul>li>.left>ul>li:nth-of-type(5) {
  top: 12px;
  left: 26px;
}
.box>ul>li>.left>ul>li:nth-of-type(6) {
  top: 6px;
  left: 32px;
}
.box>ul>li>.left>ul>li:nth-of-type(7) {
  top: 2px;
  left: 40px;
}
.box>ul>li>.left>ul>li:nth-of-type(8) {
  top: 0px;
  left: 49px;
}

.box>ul>li>.left>ul>li:nth-of-type(9) {
  top: 0px;
  right: 49px;
}
.box>ul>li>.left>ul>li:nth-of-type(10) {
  top: 2px;
  right: 40px;
}
.box>ul>li>.left>ul>li:nth-of-type(11) {
  top: 6px;
  right: 32px;
}
.box>ul>li>.left>ul>li:nth-of-type(12) {
  top: 12px;
  right: 26px;
}
.box>ul>li>.left>ul>li:nth-of-type(13) {
  top: 20px;
  right: 18px;
}
.box>ul>li>.left>ul>li:nth-of-type(14) {
  top: 28px;
  right: 11px;
}
.box>ul>li>.left>ul>li:nth-of-type(15) {
  top: 38px;
  right: 5px;
}
.box>ul>li>.left>ul>li:nth-of-type(16) {
  top: 50px;
  right: 0px;
}
/* right */
.box>ul>li>.right {
  position: relative;
  width: 100%;
  height: 25%;
  /* border: 1px solid #d0d0d0; */
}

.box>ul>li>.right>ul>li {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #BEBEBE;
  border-radius: 5px;
  /* transform: rotate(90deg); */
}

.box>ul>li>.right>ul>li:nth-of-type(1) {
  bottom: 50px;
  left: 0px;
}
.box>ul>li>.right>ul>li:nth-of-type(2) {
  bottom: 38px;
  left: 5px;
}
.box>ul>li>.right>ul>li:nth-of-type(3) {
  bottom: 28px;
  left: 11px;
}
.box>ul>li>.right>ul>li:nth-of-type(4) {
  bottom: 20px;
  left: 18px;
}
.box>ul>li>.right>ul>li:nth-of-type(5) {
  bottom: 12px;
  left: 26px;
}
.box>ul>li>.right>ul>li:nth-of-type(6) {
  bottom: 6px;
  left: 32px;
}
.box>ul>li>.right>ul>li:nth-of-type(7) {
  bottom: 2px;
  left: 40px;
}
.box>ul>li>.right>ul>li:nth-of-type(8) {
  bottom: 0px;
  left: 49px;
}

.box>ul>li>.right>ul>li:nth-of-type(9) {
  bottom: 0px;
  right: 49px;
}
.box>ul>li>.right>ul>li:nth-of-type(10) {
  bottom: 2px;
  right: 40px;
}
.box>ul>li>.right>ul>li:nth-of-type(11) {
  bottom: 6px;
  right: 32px;
}
.box>ul>li>.right>ul>li:nth-of-type(12) {
  bottom: 12px;
  right: 26px;
}
.box>ul>li>.right>ul>li:nth-of-type(13) {
  bottom: 20px;
  right: 18px;
}
.box>ul>li>.right>ul>li:nth-of-type(14) {
  bottom: 28px;
  right: 11px;
}
.box>ul>li>.right>ul>li:nth-of-type(15) {
  bottom: 38px;
  right: 5px;
}
.box>ul>li>.right>ul>li:nth-of-type(16) {
  bottom: 50px;
  right: 0px;
}

/* top */
.box>.top {
  width: 85%;
  height: 50%;
  padding: 10px 0px 0px 10px;
  position: absolute;
  top: 50px;
  left: 110px;
  /* border: #c0c0c0 1px solid; */

}
.box>.top>.top-01 {
  width: 100%;
  height: 5px;
  display: flex;
}

.box>.top>.top-01>li {
  width: 5%;
  height: 100%;
  background-color: #BEBEBE;
  margin-right: 20px;
}
.box>.top>.top-02 {
  width: 100%;
  height: 5px;
  margin-top: 12px;
  display: flex;
}

.box>.top>.top-02>li {
  width: 5%;
  height: 100%;
  background-color: #BEBEBE;
  margin-right: 20px;
}
.box>.top>.top-03 {
  width: 100%;
  height: 5px;
  margin-top: 12px;
  display: flex;
}

.box>.top>.top-03>li {
  width: 5%;
  height: 100%;
  background-color: #BEBEBE;
  margin-right: 20px;
}
.box>.top>.top-04 {
  width: 100%;
  height: 5px;
  margin-top: 12px;
  display: flex;
}

.box>.top>.top-04>li {
  width: 5%;
  height: 100%;
  background-color: #BEBEBE;
  margin-right: 20px;
}
.box>.top>.top-05 {
  width: 100%;
  height: 5px;
  margin-top: 12px;
  display: flex;
}

.box>.top>.top-05>li {
  width: 5%;
  height: 100%;
  background-color: #BEBEBE;
  margin-right: 20px;
}
</style>
