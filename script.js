// VoidDrake By DeathTeam - Script Generator
// Configurações padrão
const defaultConfig = {
    aimbot: {
        enabled: false,
        fov: 90,
        target: 'head',
        smoothness: 5
    },
    esp: {
        enabled: false,
        showNames: true,
        showBoxes: true,
        showDistance: true,
        wallhack: false,
        maxDistance: 300
    },
    hitbox: {
        enabled: false,
        size: 3,
        expandHead: true,
        expandTorso: true
    },
    player: {
        speed: 16,
        jumpHeight: 50,
        noClip: false,
        fly: false,
        godMode: false
    },
    settings: {
        autoSave: true
    }
};

let currentConfig = { ...defaultConfig };

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeSliders();
    initializeSettings();
    loadSettings();
    setupEventListeners();
});

// Sistema de abas
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Inicialização dos sliders
function initializeSliders() {
    const sliders = [
        { id: 'aimbot-fov', valueId: 'aimbot-fov-value', suffix: '°' },
        { id: 'aimbot-smoothness', valueId: 'aimbot-smoothness-value', suffix: '' },
        { id: 'esp-maxDistance', valueId: 'esp-maxDistance-value', suffix: 'm' },
        { id: 'hitbox-size', valueId: 'hitbox-size-value', suffix: 'x' },
        { id: 'player-speed', valueId: 'player-speed-value', suffix: '' },
        { id: 'player-jumpHeight', valueId: 'player-jumpHeight-value', suffix: '' }
    ];

    sliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        if (element && valueElement) {
            element.addEventListener('input', () => {
                valueElement.textContent = element.value + slider.suffix;
                updateConfig();
            });
        }
    });
}

// Inicialização das configurações
function initializeSettings() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selects = document.querySelectorAll('select');
    const ranges = document.querySelectorAll('input[type="range"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateConfig);
    });

    selects.forEach(select => {
        select.addEventListener('change', updateConfig);
    });

    ranges.forEach(range => {
        range.addEventListener('input', updateConfig);
    });
}

// Atualização da configuração
function updateConfig() {
    currentConfig = {
        aimbot: {
            enabled: document.getElementById('aimbot-enabled').checked,
            fov: parseInt(document.getElementById('aimbot-fov').value),
            target: document.getElementById('aimbot-target').value,
            smoothness: parseInt(document.getElementById('aimbot-smoothness').value)
        },
        esp: {
            enabled: document.getElementById('esp-enabled').checked,
            showNames: document.getElementById('esp-showNames').checked,
            showBoxes: document.getElementById('esp-showBoxes').checked,
            showDistance: document.getElementById('esp-showDistance').checked,
            wallhack: document.getElementById('esp-wallhack').checked,
            maxDistance: parseInt(document.getElementById('esp-maxDistance').value)
        },
        hitbox: {
            enabled: document.getElementById('hitbox-enabled').checked,
            size: parseFloat(document.getElementById('hitbox-size').value),
            expandHead: document.getElementById('hitbox-expandHead').checked,
            expandTorso: document.getElementById('hitbox-expandTorso').checked
        },
        player: {
            speed: parseInt(document.getElementById('player-speed').value),
            jumpHeight: parseInt(document.getElementById('player-jumpHeight').value),
            noClip: document.getElementById('player-noClip').checked,
            fly: document.getElementById('player-fly').checked,
            godMode: document.getElementById('player-godMode').checked
        },
        settings: {
            autoSave: document.getElementById('auto-save').checked
        }
    };

    if (currentConfig.settings.autoSave) {
        saveSettings();
    }
}

// Salvamento das configurações
function saveSettings() {
    localStorage.setItem('voiddrake-config', JSON.stringify(currentConfig));
}

// Carregamento das configurações
function loadSettings() {
    const saved = localStorage.getItem('voiddrake-config');
    if (saved) {
        currentConfig = JSON.parse(saved);
        applySettings();
    }
}

// Aplicação das configurações na interface
function applySettings() {
    // Aimbot
    document.getElementById('aimbot-enabled').checked = currentConfig.aimbot.enabled;
    document.getElementById('aimbot-fov').value = currentConfig.aimbot.fov;
    document.getElementById('aimbot-fov-value').textContent = currentConfig.aimbot.fov + '°';
    document.getElementById('aimbot-target').value = currentConfig.aimbot.target;
    document.getElementById('aimbot-smoothness').value = currentConfig.aimbot.smoothness;
    document.getElementById('aimbot-smoothness-value').textContent = currentConfig.aimbot.smoothness;

    // ESP
    document.getElementById('esp-enabled').checked = currentConfig.esp.enabled;
    document.getElementById('esp-showNames').checked = currentConfig.esp.showNames;
    document.getElementById('esp-showBoxes').checked = currentConfig.esp.showBoxes;
    document.getElementById('esp-showDistance').checked = currentConfig.esp.showDistance;
    document.getElementById('esp-wallhack').checked = currentConfig.esp.wallhack;
    document.getElementById('esp-maxDistance').value = currentConfig.esp.maxDistance;
    document.getElementById('esp-maxDistance-value').textContent = currentConfig.esp.maxDistance + 'm';

    // Hitbox
    document.getElementById('hitbox-enabled').checked = currentConfig.hitbox.enabled;
    document.getElementById('hitbox-size').value = currentConfig.hitbox.size;
    document.getElementById('hitbox-size-value').textContent = currentConfig.hitbox.size + 'x';
    document.getElementById('hitbox-expandHead').checked = currentConfig.hitbox.expandHead;
    document.getElementById('hitbox-expandTorso').checked = currentConfig.hitbox.expandTorso;

    // Player
    document.getElementById('player-speed').value = currentConfig.player.speed;
    document.getElementById('player-speed-value').textContent = currentConfig.player.speed;
    document.getElementById('player-jumpHeight').value = currentConfig.player.jumpHeight;
    document.getElementById('player-jumpHeight-value').textContent = currentConfig.player.jumpHeight;
    document.getElementById('player-noClip').checked = currentConfig.player.noClip;
    document.getElementById('player-fly').checked = currentConfig.player.fly;
    document.getElementById('player-godMode').checked = currentConfig.player.godMode;

    // Settings
    document.getElementById('auto-save').checked = currentConfig.settings.autoSave;
}

// Geração do script Lua
function generateScript() {
    const luaScript = `-- VoidDrake By DeathTeam - Gerador Universal de Scripts Roblox
-- 𝔇𝖊𝖆𝖙𝖍𝖇𝖗𝖎𝖓𝖌𝖊𝖗🇮🇹(diretor/funcionalidades), Beto(designer), Arthur(designer principal)
-- Compatível com: KRNL, Arceus X, Delta, Hydrogen e outros executores

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local Workspace = game:GetService("Workspace")
local Camera = Workspace.CurrentCamera
local LocalPlayer = Players.LocalPlayer

-- Configurações Geradas
local Config = {
    Aimbot = {
        Enabled = ${currentConfig.aimbot.enabled},
        FOV = ${currentConfig.aimbot.fov},
        Target = "${currentConfig.aimbot.target === 'head' ? 'Head' : currentConfig.aimbot.target === 'torso' ? 'Torso' : 'Head'}",
        Smoothness = ${currentConfig.aimbot.smoothness}
    },
    ESP = {
        Enabled = ${currentConfig.esp.enabled},
        ShowNames = ${currentConfig.esp.showNames},
        ShowBoxes = ${currentConfig.esp.showBoxes},
        ShowDistance = ${currentConfig.esp.showDistance},
        Wallhack = ${currentConfig.esp.wallhack},
        MaxDistance = ${currentConfig.esp.maxDistance}
    },
    Hitbox = {
        Enabled = ${currentConfig.hitbox.enabled},
        Size = ${currentConfig.hitbox.size},
        ExpandHead = ${currentConfig.hitbox.expandHead},
        ExpandTorso = ${currentConfig.hitbox.expandTorso}
    },
    Player = {
        Speed = ${currentConfig.player.speed},
        JumpHeight = ${currentConfig.player.jumpHeight},
        NoClip = ${currentConfig.player.noClip},
        Fly = ${currentConfig.player.fly},
        GodMode = ${currentConfig.player.godMode}
    }
}

print("🐉 VoidDrake Script Carregado! 💀")
print("Configurações:", Config)

-- Variáveis Globais
local ESPObjects = {}
local Connections = {}
local Flying = false
local NoClipping = false

-- Função de Aimbot
local function GetClosestPlayer()
    local closestPlayer = nil
    local shortestDistance = math.huge
    
    for _, player in pairs(Players:GetPlayers()) do
        if player ~= LocalPlayer and player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local character = player.Character
            local humanoidRootPart = character.HumanoidRootPart
            local head = character:FindFirstChild("Head")
            local torso = character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso")
            
            local targetPart = nil
            if Config.Aimbot.Target == "Head" and head then
                targetPart = head
            elseif Config.Aimbot.Target == "Torso" and torso then
                targetPart = torso
            else
                targetPart = humanoidRootPart
            end
            
            if targetPart then
                local screenPoint, onScreen = Camera:WorldToScreenPoint(targetPart.Position)
                if onScreen then
                    local distance = (Vector2.new(screenPoint.X, screenPoint.Y) - Vector2.new(Camera.ViewportSize.X/2, Camera.ViewportSize.Y/2)).Magnitude
                    if distance < Config.Aimbot.FOV and distance < shortestDistance then
                        closestPlayer = player
                        shortestDistance = distance
                    end
                end
            end
        end
    end
    
    return closestPlayer
end

-- Sistema de Aimbot
if Config.Aimbot.Enabled then
    Connections.Aimbot = RunService.Heartbeat:Connect(function()
        local target = GetClosestPlayer()
        if target and target.Character then
            local character = target.Character
            local targetPart = nil
            
            if Config.Aimbot.Target == "Head" and character:FindFirstChild("Head") then
                targetPart = character.Head
            elseif Config.Aimbot.Target == "Torso" and (character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso")) then
                targetPart = character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso")
            else
                targetPart = character:FindFirstChild("HumanoidRootPart")
            end
            
            if targetPart then
                local targetPosition = targetPart.Position
                local currentCFrame = Camera.CFrame
                local targetCFrame = CFrame.lookAt(currentCFrame.Position, targetPosition)
                
                Camera.CFrame = currentCFrame:Lerp(targetCFrame, Config.Aimbot.Smoothness / 100)
            end
        end
    end)
end

-- Sistema de ESP
local function CreateESP(player)
    if not player.Character or ESPObjects[player] then return end
    
    local character = player.Character
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    local espFolder = Instance.new("Folder")
    espFolder.Name = "ESP_" .. player.Name
    espFolder.Parent = character
    
    -- Nome do jogador
    if Config.ESP.ShowNames then
        local nameGui = Instance.new("BillboardGui")
        nameGui.Name = "NameESP"
        nameGui.Adornee = character:FindFirstChild("Head")
        nameGui.Size = UDim2.new(0, 200, 0, 50)
        nameGui.StudsOffset = Vector3.new(0, 2, 0)
        nameGui.Parent = espFolder
        
        local nameLabel = Instance.new("TextLabel")
        nameLabel.Size = UDim2.new(1, 0, 1, 0)
        nameLabel.BackgroundTransparency = 1
        nameLabel.Text = player.Name
        nameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
        nameLabel.TextStrokeTransparency = 0
        nameLabel.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
        nameLabel.Font = Enum.Font.SourceSansBold
        nameLabel.TextSize = 16
        nameLabel.Parent = nameGui
    end
    
    -- Distância
    if Config.ESP.ShowDistance then
        local distanceGui = Instance.new("BillboardGui")
        distanceGui.Name = "DistanceESP"
        distanceGui.Adornee = humanoidRootPart
        distanceGui.Size = UDim2.new(0, 200, 0, 50)
        distanceGui.StudsOffset = Vector3.new(0, -2, 0)
        distanceGui.Parent = espFolder
        
        local distanceLabel = Instance.new("TextLabel")
        distanceLabel.Size = UDim2.new(1, 0, 1, 0)
        distanceLabel.BackgroundTransparency = 1
        distanceLabel.TextColor3 = Color3.fromRGB(255, 255, 0)
        distanceLabel.TextStrokeTransparency = 0
        distanceLabel.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
        distanceLabel.Font = Enum.Font.SourceSans
        distanceLabel.TextSize = 14
        distanceLabel.Parent = distanceGui
        
        -- Atualizar distância
        Connections["Distance_" .. player.Name] = RunService.Heartbeat:Connect(function()
            if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart") and humanoidRootPart then
                local distance = (LocalPlayer.Character.HumanoidRootPart.Position - humanoidRootPart.Position).Magnitude
                distanceLabel.Text = math.floor(distance) .. "m"
                
                if distance > Config.ESP.MaxDistance then
                    espFolder.Parent = nil
                else
                    espFolder.Parent = character
                end
            end
        end)
    end
    
    ESPObjects[player] = espFolder
end

-- Ativar ESP para todos os jogadores
if Config.ESP.Enabled then
    for _, player in pairs(Players:GetPlayers()) do
        if player ~= LocalPlayer then
            CreateESP(player)
        end
    end
    
    Connections.PlayerAdded = Players.PlayerAdded:Connect(function(player)
        player.CharacterAdded:Connect(function()
            wait(1)
            CreateESP(player)
        end)
    end)
    
    Connections.PlayerRemoving = Players.PlayerRemoving:Connect(function(player)
        if ESPObjects[player] then
            ESPObjects[player]:Destroy()
            ESPObjects[player] = nil
        end
        if Connections["Distance_" .. player.Name] then
            Connections["Distance_" .. player.Name]:Disconnect()
            Connections["Distance_" .. player.Name] = nil
        end
    end)
end

-- Sistema de Hitbox
if Config.Hitbox.Enabled then
    Connections.Hitbox = RunService.Heartbeat:Connect(function()
        for _, player in pairs(Players:GetPlayers()) do
            if player ~= LocalPlayer and player.Character then
                local character = player.Character
                
                if Config.Hitbox.ExpandHead and character:FindFirstChild("Head") then
                    character.Head.Size = Vector3.new(Config.Hitbox.Size, Config.Hitbox.Size, Config.Hitbox.Size)
                    character.Head.Transparency = 0.7
                    character.Head.CanCollide = false
                end
                
                if Config.Hitbox.ExpandTorso then
                    local torso = character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso")
                    if torso then
                        torso.Size = Vector3.new(Config.Hitbox.Size, Config.Hitbox.Size, Config.Hitbox.Size)
                        torso.Transparency = 0.7
                        torso.CanCollide = false
                    end
                end
            end
        end
    end)
end

-- Modificações do Jogador
if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("Humanoid") then
    local humanoid = LocalPlayer.Character.Humanoid
    
    -- Velocidade
    if Config.Player.Speed ~= 16 then
        humanoid.WalkSpeed = Config.Player.Speed
    end
    
    -- Altura do pulo
    if Config.Player.JumpHeight ~= 50 then
        humanoid.JumpPower = Config.Player.JumpHeight
    end
    
    -- Modo Deus
    if Config.Player.GodMode then
        humanoid.MaxHealth = math.huge
        humanoid.Health = math.huge
    end
end

-- NoClip
if Config.Player.NoClip then
    NoClipping = true
    Connections.NoClip = RunService.Stepped:Connect(function()
        if LocalPlayer.Character then
            for _, part in pairs(LocalPlayer.Character:GetDescendants()) do
                if part:IsA("BasePart") and part.CanCollide then
                    part.CanCollide = false
                end
            end
        end
    end)
end

-- Fly
if Config.Player.Fly then
    Flying = true
    local bodyVelocity = Instance.new("BodyVelocity")
    bodyVelocity.MaxForce = Vector3.new(math.huge, math.huge, math.huge)
    bodyVelocity.Velocity = Vector3.new(0, 0, 0)
    
    if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart") then
        bodyVelocity.Parent = LocalPlayer.Character.HumanoidRootPart
        
        Connections.Fly = UserInputService.InputBegan:Connect(function(input)
            if input.KeyCode == Enum.KeyCode.W then
                bodyVelocity.Velocity = Camera.CFrame.LookVector * 50
            elseif input.KeyCode == Enum.KeyCode.S then
                bodyVelocity.Velocity = Camera.CFrame.LookVector * -50
            elseif input.KeyCode == Enum.KeyCode.A then
                bodyVelocity.Velocity = Camera.CFrame.RightVector * -50
            elseif input.KeyCode == Enum.KeyCode.D then
                bodyVelocity.Velocity = Camera.CFrame.RightVector * 50
            elseif input.KeyCode == Enum.KeyCode.Space then
                bodyVelocity.Velocity = Vector3.new(0, 50, 0)
            elseif input.KeyCode == Enum.KeyCode.LeftShift then
                bodyVelocity.Velocity = Vector3.new(0, -50, 0)
            end
        end)
        
        Connections.FlyEnd = UserInputService.InputEnded:Connect(function(input)
            if input.KeyCode == Enum.KeyCode.W or input.KeyCode == Enum.KeyCode.S or 
               input.KeyCode == Enum.KeyCode.A or input.KeyCode == Enum.KeyCode.D or 
               input.KeyCode == Enum.KeyCode.Space or input.KeyCode == Enum.KeyCode.LeftShift then
                bodyVelocity.Velocity = Vector3.new(0, 0, 0)
            end
        end)
    end
end

-- Limpeza ao sair
game:GetService("Players").PlayerRemoving:Connect(function(player)
    if player == LocalPlayer then
        for _, connection in pairs(Connections) do
            if connection then
                connection:Disconnect()
            end
        end
    end
end)

print("✅ VoidDrake Script Ativo! Todas as funcionalidades carregadas.")
print("🎮 Divirta-se e jogue com responsabilidade!")`;

    document.getElementById('generatedScript').value = luaScript;
    
    // Scroll para a área do script
    document.getElementById('generatedScript').scrollIntoView({ behavior: 'smooth' });
    
    // Feedback visual
    const generateBtn = document.getElementById('generateScriptBtn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-check"></i> Script Gerado!';
    generateBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
    
    setTimeout(() => {
        generateBtn.innerHTML = originalText;
        generateBtn.style.background = '';
    }, 2000);
}

// Copiar script
function copyScript() {
    const scriptText = document.getElementById('generatedScript').value;
    if (scriptText) {
        navigator.clipboard.writeText(scriptText).then(() => {
            showNotification('Script copiado para a área de transferência!', 'success');
        }).catch(() => {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = scriptText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Script copiado!', 'success');
        });
    } else {
        showNotification('Gere um script primeiro!', 'error');
    }
}

// Download do script
function downloadScript() {
    const scriptText = document.getElementById('generatedScript').value;
    if (scriptText) {
        const blob = new Blob([scriptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'voiddrake_script.lua';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Script baixado!', 'success');
    } else {
        showNotification('Gere um script primeiro!', 'error');
    }
}

// Reset das configurações
function resetSettings() {
    if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
        currentConfig = { ...defaultConfig };
        applySettings();
        localStorage.removeItem('voiddrake-config');
        showNotification('Configurações resetadas!', 'success');
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #8b5cf6, #f97316)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Configuração dos event listeners
function setupEventListeners() {
    document.getElementById('generateScriptBtn').addEventListener('click', generateScript);
    document.getElementById('copyScriptBtn').addEventListener('click', copyScript);
    document.getElementById('downloadScriptBtn').addEventListener('click', downloadScript);
    document.getElementById('resetSettingsBtn').addEventListener('click', resetSettings);
}

// Animações CSS adicionais
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

