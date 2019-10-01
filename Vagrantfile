# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# Vagrant provisioning script
$script = <<-SCRIPT
sudo rm -f /etc/resolv.conf
sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo snap install docker
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install openjdk-8-jdk-headless -y
sudo apt-get install jenkins -y
sudo mkdir /home/jenkins && sudo rm -rf /var/lib/jenkins/workspace && sudo ln -s /home/jenkins /var/lib/jenkins/workspace
sudo chown -R jenkins:jenkins /home/jenkins/
sudo systemctl start jenkins
sudo groupadd docker
sudo usermod -aG docker vagrant
sudo usermod -aG docker jenkins
echo 'Waiting for Jeknins to startup...'
sleep 30
echo 'Jenkins initial admin password:'
cat /var/lib/jenkins/secrets/initialAdminPassword
echo 'Open you browser to http://localhost:9060'
SCRIPT

# Vagrant vm configuration
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "generic/ubuntu1904"
    config.vm.network "forwarded_port", guest: 8080, host: 9060
    config.vm.network "forwarded_port", guest: 5580, host: 5580
    config.vm.provision "shell", inline: $script  
    config.vm.provider :virtualbox do |vb|
      vb.gui = false # change to `true` if you get "Error: Connection timeout." while booting
      vb.memory = 2048 # warning: this is higher than what our production server has
      vb.cpus = 2
      vb.customize [
        'modifyvm', :id,
        '--natdnshostresolver1', 'on',
        "--natdnsproxy1", "on",
        "--nictype1", "virtio"
      ]
    end
  end