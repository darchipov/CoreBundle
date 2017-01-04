<?php

namespace Ekyna\Bundle\CoreBundle;

use Ekyna\Bundle\CoreBundle\DependencyInjection\Compiler\ResolveDoctrineTargetEntitiesPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * Class AbstractBundle
 * @package Ekyna\Bundle\CoreBundle
 * @author Étienne Dauvergne <contact@ekyna.com>
 *
 * @todo Move to ResourceBundle
 */
abstract class AbstractBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        $interfaces = $this->getModelInterfaces();
        if (!empty($interfaces)) {
            $container->addCompilerPass(
                /** @todo Move to ResourceBundle */
                new ResolveDoctrineTargetEntitiesPass($interfaces)
            );
        }
    }

    /**
     * Target entities resolver configuration (Interface - Model).
     *
     * @return array
     */
    protected function getModelInterfaces()
    {
        return [];
    }
}
